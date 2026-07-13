const path = require("path");
const fs = require("fs");
const Assigndata = require("../../models/TempleteModel/assigndata");
const Files = require("../../models/TempleteModel/files");
const Template = require("../../models/TempleteModel/templete");
const sequelize = require("../../utils/database");
const { DataTypes, Op, QueryTypes } = require("sequelize");
const csvToJson = require("../../services/csv_to_json");
const jsonToCsv = require("../../services/json_to_csv");
const { Parser } = require("json2csv");

const DownloadCorrectedCsv = async (req, res) => {
  try {
    const { taskId } = req.params;
    // console.log(taskId)
    const task = await Assigndata.findOne({ where: { id: taskId } });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const { fileId, templeteId } = task;

    if (!fileId) {
      return res.status(400).json({ error: "fileId not found" });
    }

    const template = await Template.findByPk(templeteId);
    if (!template) {
      return res.status(400).json({ error: "Template not found" });
    }

    const fileData = await Files.findByPk(fileId);
    if (!fileData) {
      return res.status(404).json({ error: "File not found" });
    }

    const { startIndex } = fileData;
    const { csvTableName } = template;

    // console.log(startIndex)
    // console.log(csvTableName)

    const data = await sequelize.query(
      `SELECT
      ${csvTableName}.*,
      errortables.Corrected,
      errortables.CorrectedBy,
      CASE
          WHEN errortables.Need_Checking = 1 THEN 'Yes'
          ELSE 'No'
      END AS Need_Checking
   FROM ${csvTableName}
   LEFT JOIN errortables
     ON ${csvTableName}.id = errortables.parentId
    AND errortables.fileId = ${fileId}
   WHERE ${csvTableName}.id >= ${startIndex}`,
      {
        type: QueryTypes.SELECT,
      }
    )
    // const data = await sequelize.query(
    //   `SELECT * FROM ${csvTableName} WHERE id >= ${startIndex}`,
    //   {
    //     type: QueryTypes.SELECT,
    //   }
    // );

    // console.log(data)

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "No data available to download" });
    }

    const csvParser = new Parser();
    const csvData = csvParser.parse(data);

    const filePath = path.join(__dirname, "corrected_file.csv");
    fs.writeFileSync(filePath, csvData);

    res.download(filePath, "corrected_file.csv", (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res
          .status(500)
          .json({ error: "An error occurred while sending the file" });
      }

      // Clean up file after sending
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    console.error("Error processing CSV file:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
};

module.exports = DownloadCorrectedCsv;

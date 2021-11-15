import express from "express";
import cors from "cors";

// TOOLS
import logs from "./compiler/logs";
import parser from "./grammar";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.post("/compile", (req, res) => {
  const body = req.body;
  if (body?.code?.length) {
    // INICIAR PARSER
    try {
      logs.length = 0;
      parser.parse(body.code);
      return res.status(200).json({ success: true, logs });
    } catch (err) {
      return res.status(200).json({ success: false, err });
    }
  } else return res.status(200).json({ success: false });
});

app.listen(5000, () => {
  console.log("Servidor en http://localhost:5000");
});

export default {};

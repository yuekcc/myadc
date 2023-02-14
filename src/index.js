import express from 'express';
import { invokeService } from './vm';
const app = express();

app.all('/app/:appId/:serviceName', (req, res) => {
  const { appId, serviceName } = req.params;
  invokeService(appId, serviceName, { req, res });
});

const port = process.env.ADC_PORT || 3000;
app.listen(port, () => {
  console.log(`Hosted on http://127.0.0.1:${port}`);
});

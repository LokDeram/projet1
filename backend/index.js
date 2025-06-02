import express from 'express';
import cors from 'cors';
import subscribeRoutes from './routes/subscribeRoutes.js';
import sendNotificationRoutes from './routes/sendNotification.js'; 
import avisRoutes from './routes/avisRoutes.js'; 

const app = express();
app.use(cors());
app.use(express.json());


app.use('/subscribe', subscribeRoutes);        
app.use('/send-notification', sendNotificationRoutes); 
app.use('/alerts', avisRoutes);      
app.use('/avis-alertes', avisRoutes);        

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(` Serveur backend lancé sur le port ${PORT}`);
});

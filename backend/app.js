import express from "express";
import cors from "cors";
import path from "path";
import bannerRoutes from "./routes/home/bannerRoutes.js";
import flashNewsRoutes from "./routes/home/flashNewsRoutes.js";
import presidentMessageRoutes from "./routes/home/presidentMessageRoutes.js";
import aboutSamitiRoutes from "./routes/home/aboutSamitiRoutes.js";
import eventRoutes from "./routes/home/upcomingEventRoutes.js";
import quickServiceRoutes from "./routes/home/quickServiceRoutes.js";
import galleryRoutes from "./routes/home/galleryRoutes.js";
import pageBannerRoutes from "./routes/pageBannerRoutes.js";
import heritageFeatureRoutes from "./routes/aboutus/heritageFeatureRoutes.js";
import coreValueRoutes from "./routes/aboutus/coreValueRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));
 
app.use("/api/banners", bannerRoutes);
app.use("/api/flash-news", flashNewsRoutes);
app.use("/api/president-message", presidentMessageRoutes);
app.use("/api/about-samiti", aboutSamitiRoutes);
app.use("/api/quick-services", quickServiceRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/page-banners",pageBannerRoutes);
app.use("/api/heritage-features",heritageFeatureRoutes);
app.use("/api/core-values",coreValueRoutes);



export default app;
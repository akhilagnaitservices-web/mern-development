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
import leadershipMemberRoutes from "./routes/aboutus/leadershipMemberRoutes.js";
import gothraRoutes from "./routes/gothras/gothraRoutes.js";
import eventroutes from "./routes/events/eventRoutes.js";
import eventGalleryRoutes from "./routes/events/eventGalleryRoutes.js";
import eventRegistrationRoutes from "./routes/events/eventRegistrationRoutes.js";
import galleryCategoryRoutes from "./routes/gallery/galleryCategoryRoutes.js";
import getGalleryAlbums  from "./routes/gallery/galleryAlbumRoutes.js";
import getphotos from "./routes/gallery/galleryPhotoRoutes.js";
import galleryVideoRoutes from "./routes/gallery/galleryVideoRoutes.js";
import contactInformationRoutes from "./routes/contact/contactInformationRoutes.js";
import contactMessageRoutes from "./routes/contact/contactMessageRoutes.js";
import newsCategoryRoutes from "./routes/news/newsCategoryRoutes.js";
import newsRoutes from "./routes/news/newsRoutes.js";
import headerRoutes from "./routes/header/headerRoutes.js"
import userAuthRoutes from "./routes/auth/userAuthRoutes.js";
import adminAuthRoutes from "./routes/auth/adminAuthRoutes.js";
import adminUserRoutes from "./routes/admin/adminUserRoutes.js";
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
app.use("/api/leadership-members",leadershipMemberRoutes);
app.use("/api/gothras", gothraRoutes);
app.use("/api/mainevents", eventroutes);
app.use("/api/event-gallery", eventGalleryRoutes);
app.use("/api/event-registrations", eventRegistrationRoutes);
app.use("/api/gallery-categories", galleryCategoryRoutes);
app.use("/api/gallery-albums", getGalleryAlbums);
app.use("/api/gallery-photos", getphotos);
app.use("/api/gallery-videos", galleryVideoRoutes);
app.use("/api/contact-information", contactInformationRoutes);
app.use("/api/contact-messages", contactMessageRoutes);
app.use("/api/news-categories", newsCategoryRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/header",headerRoutes)
app.use("/api/auth", userAuthRoutes);
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin/users", adminUserRoutes);
export default app;
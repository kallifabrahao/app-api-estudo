import multer from "multer";

const storage = multer.memoryStorage();

const uploadAudio = multer({
  storage,
});

export default uploadAudio;

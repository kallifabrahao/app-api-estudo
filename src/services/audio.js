import { Readable } from "stream";
import mongoose from "mongoose";
import { getBucket } from "../config/database.js";

const salvarAudio = async (file) => {
  const bucket = getBucket();

  const stream = Readable.from(file[0].buffer);

  return new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(file.originalname, {
      contentType: file.mimetype,
    });

    stream
      .pipe(uploadStream)
      .on("error", reject)
      .on("finish", () => resolve(uploadStream.id.toString()));
  });
};

const streamAudioService = async (req, res) => {
  const db = mongoose.connection.db;
  const bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "audios",
  });

  const audioId = new mongoose.Types.ObjectId(req.params.id);

  const files = await bucket.find({ _id: audioId }).toArray();

  if (!files || files.length === 0) {
    return res.status(404).json({ message: "Áudio não encontrado" });
  }

  const file = files[0];
  const fileSize = file.length;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunkSize = end - start + 1;

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": file.contentType || "audio/mpeg",
    });

    bucket.openDownloadStream(audioId, { start, end: end + 1 }).pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": fileSize,
      "Content-Type": file.contentType || "audio/mpeg",
    });

    bucket.openDownloadStream(audioId).pipe(res);
  }
};

const deletarAudioService = async (audioId) => {
  const db = mongoose.connection.db;
  const bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "audios",
  });

  await bucket.delete(new mongoose.Types.ObjectId(audioId));

  return { message: "Áudio removido com sucesso" };
};

export { salvarAudio, streamAudioService, deletarAudioService };

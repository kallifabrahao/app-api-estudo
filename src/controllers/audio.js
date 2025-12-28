import { streamAudioService } from "../services/audio.js";

const streamAudio = async (req, res) => {
  try {
    await streamAudioService(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};

export { streamAudio };

import * as mediasoup from 'mediasoup';

let worker: mediasoup.types.Worker;
let router: mediasoup.types.Router;

async function startMediasoup() {
    worker = await mediasoup.createWorker();

    worker.on('died', () => {
        console.error('Mediasoup Worker died, exiting...');
        process.exit(1);
    });

    router = await worker.createRouter({
        mediaCodecs: [
            {
                kind: 'audio',
                mimeType: 'audio/opus',
                clockRate: 48000,
                channels: 2
            },
            {
                kind: 'video',
                mimeType: 'video/VP8',
                clockRate: 90000,
                parameters: {
                    'x-google-start-bitrate': 1000
                }
            }
        ]
    });

    console.log('Mediasoup router initialized');
}

export { startMediasoup, router };

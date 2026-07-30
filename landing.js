const video = document.getElementById("camera");

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: {
                    ideal: "environment"
                }
            },
            audio: false
        });

        video.srcObject = stream;
    } catch (err) {
        alert("Camera access denied or unavailable.");
        console.error(err);
    }
}

startCamera();

document.getElementById("mainBtn").addEventListener("click", () => {
    alert("I love you, Yukta! Happy Girlfriend's Day! 💖 and here is something special for you!");
});
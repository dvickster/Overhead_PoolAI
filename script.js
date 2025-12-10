let mode = null;
const phoneVideo = document.getElementById("phoneVideo");
const pcVideo = document.getElementById("pcVideo");

document.getElementById("phoneBtn").onclick = startPhone;
document.getElementById("pcBtn").onclick = () => {
  document.getElementById("pcControls").style.display = "block";
  mode = "pc";
};

async function startPhone() {
  mode = "phone";
  document.getElementById("phoneControls").style.display = "block";

  const peer = new Peer();

  peer.on("open", (id) => {
    document.getElementById("peerId").textContent = id;
  });

  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });

  phoneVideo.srcObject = stream;
  phoneVideo.play();

  peer.on("call", (call) => {
    call.answer(stream);
  });
}

document.getElementById("connectBtn").onclick = () => {
  const targetId = document.getElementById("targetId").value;
  const peer = new Peer();

  const call = peer.call(targetId, null);

  call.on("stream", (remoteStream) => {
    pcVideo.srcObject = remoteStream;
    pcVideo.play();
  });
};
const recordButton = document.querySelector(".record-button")
const stopButton = document.querySelector(".stop-button")
const playButton = document.querySelector(".play-button")
const downloadButton = document.querySelector(".download-button")
const previewPlayer = document.querySelector("#preview")
const recordingPlayer = document.querySelector("#recording");

let recorder, recorderChunk = [];

function videoStart() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
            previewPlayer.srcObject = stream; //접근 성공, stream을 preview에 연결시켜주어야함.
            //녹화버튼 누르면 화면뜸.(단순히 보여주는 용도)
            startRecord(previewPlayer.captureStream());
            //녹화를 해준다.



        })
}


function startRecord(stream) {
    recorder = new MediaRecorder(stream);//js.13의 stream을 받아온것.
    recorder.ondataavailable = (e) => { recorderChunk.push(e.data) };
    //data가 available되면 내용이 실행된다, 
    recorder.start();
}

function stopRecord() {
    //previewPlayer.srcObject.getTracks()는 배열의 형태로 반환이 되므로 foreach로 각각 중지를 시켜준다.
    previewPlayer.srcObject.getTracks().forEach(track => track.stop())
    //preview종료
    recorder.stop();//녹화종료
}



recordButton.addEventListener("click", videoStart);
stopButton.addEventListener("click", stopRecord);
playButton.addEventListener("click",);
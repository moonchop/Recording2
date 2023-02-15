# Video-Recording
Video recording webpage(Clone Coding)

javascript로 컴퓨터웹캠을 이용한 비디오 녹화, 재생, 다운로드 기능을 구현해보았다.

## Preview
<img src=https://user-images.githubusercontent.com/82392767/218969118-1a3cd489-b376-4de6-b5c8-24660f8cc069.gif width="60%" height="60%"/>

## Usage
```
> git clone https://github.com/moonchop/Video-Recording.git
> cd Video-Recording
> Open with live server(index.html)
```

<br/>
<br/>
<br/>

## Code description

녹화기능, 종료기능, 재생기능, 다운로드 기능으로 총 4개 파트를 큰 틀로 다.

### videoStart(권한허용 및 녹화시작)
```
function videoStart() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
            previewPlayer.srcObject = stream;
            startRecord(previewPlayer.captureStream());
        })
}
```
navigator.mediaDevices.getUserMedia는 사용자에게 미디어 사용권한을 요청한다. 수락하면, mediastream을 반환한다.(카메라, 비디오, 오디오, 스크린 공유 등을 포함)

접근 성공 후, previewPlayer.srcObject에 stream을 연결시키면 단순히 현재 화면만 뜨게된다.(녹화기능 X)

captureStream()은 녹화를 할때 실시간으로 녹화한다.

### startRecord(녹화기능) 
녹화하는 기능을 함수로 만들어 videoStart()에서 이용했다.
```
function startRecord(stream) {
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => { recorderChunk.push(e.data) };
    //data가 available되면 내용이 실행된다, 
    recorder.start();//녹화시작
}
```
startRecord()는 videoStart()에서 stream을 받아온다. 

null값인 recorder에 MediaRecorder(stream)를 만든다. data가 available되면 recorderChunk(녹화할 내용이 담길 배열)에 e.data를 넣는다.

> dataavailable이벤트는 MediaRecorder가 미디어 데이터를 사용하기 위해 응용 프로그램에 전달하면 시작된다.

### stopRecord(종료기능)
```
function stopRecord() {
    previewPlayer.srcObject.getTracks().forEach(track => track.stop())
    //preview종료
    recorder.stop();//녹화종료
}
```
previewPlayer.srcObject.getTracks()는 배열의 형태로 반환되므로 forEach로 개별적으로 중지시켜준다.
 
### playRecord(재생기능&다운로드)
```
function playRecord(){
    const recordedBlob = new Blob(recorderChunk,{type:"video/webm"});
    recordingPlayer.src = URL.createObjectURL(recordedBlob);
    //URL.createObjectURL는 Blob 객체를 URL로 만든다.
    recordingPlayer.play();
    
    downloadButton.href=recordingPlayer.src;
    downloadButton.download = `recording_${new Date()}.webm`
}
```
Blob객체를 URL로 바꾸어 recordingPlayer.src(html의 src속성)에 넣어준다. 이는 녹화되었던 video를 화면에 띄울수있다. 

>Blob은 이미지, 사운드, 비디오와 같은 멀티미디어 데이터를 다룰 때 사용한다. argument는 array와 options를 받는다.

## Learned
### 1. Blob createObjectURL()
 URL.createObjectURL() 메소드는 주어진 객체를 가리키는 URL을 DOMString으로 변환하는 기능을 한다. 해당 url은 window 창이 사라지면 함께 사라진다. 다른 window에서 재 사용이 불가능하다.

### 2.Blob revokeObjectURL()
 createObjectURL를 통해 만들어진 url는 해당 브라우저가 존재한 상태에서 revokeObjectURL 메소드로 url을 무효화 시키지 않으면 변수가 남아 메모리 누수가 된다. (?)URL.revokeObjectURL(recordingPlayer.src)
 

>https://kyounghwan01.github.io/blog/JS/JSbasic/Blob-url/#createobjecturl

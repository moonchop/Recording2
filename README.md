# Recording2
practice

```
function videoStart() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
            previewPlayer.srcObject = stream; //접근 성공, stream을 preview에 연결시켜주어야함.
            //녹화버튼 누르면 화면뜸.(단순히 보여주는 용도)
            startRecord(previewPlayer.captureStream());
            //녹화를 해준다.
        })
}
```

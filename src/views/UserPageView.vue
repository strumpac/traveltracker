<script setup>
    import Ticket from "@/components/Ticket.vue"
    import { onBeforeMount } from 'vue'

    //array di esempio per simulare tempo, da cambiare col db
    let allTickets = [];
    let oldTicketsStart = [];
    let oldTicketsEnd = [];
    let currentTicketsStart = []; //ora int array poi da fare con dati component
    let currentTicketsEnd = [];
    let username = "";
    let userPfpSrc = "";
    //timeNow da cambiare dopo db
    //let timeNow = 2;
    let newDate = new Date();
    newDate.setTime(Date.now());
    let timeNow = Date.now();

    //metodo da fare come costruttore, eseguito prima del render
    onBeforeMount(() => {
        getUserData();
    });



    //fetcha i dati utente
    function getUserData(){
        username = "Biggie Cheese";
        userPfpSrc = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUTEhIVFhUVGRkYGRcXFxcXFxoaFxcXFx0XFhUZHSggGBsoHRUXIjEhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGxAQGzAlICA3LSstLystLzctLy0rLS8tLSswNS0tNjUuLS0tNy0tLSstKzItNi83LTUtLSsrKy01K//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABQEDBAYHAgj/xABDEAACAQIDBAcFBgQEBQUAAAABAgADEQQSIQUxQVEGEyJhcYGRBzJCofAjUmKxwdEUguHxQ3KSohUzU2OyJDSjs8L/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAQIDBAUG/8QALREBAAICAAQEBQMFAAAAAAAAAAECAxEEEiExEzJRYSJBgdHwBTNxQrHB4fH/2gAMAwEAAhEDEQA/AO1xEQEREBERAREQEREBERAREx8TjERczEBRxJsPLifIQmImZ1DInlnA4zTdqe0HD075M72426tfVrt8hI7ortvF7RxC1VHV4Wixva4Wo9iAgJN3IvdidABbjM/EiZ1HV1TweStebJ8Me/efbTosSiiwA5Ss0chERAREQEREBERAREQEREBERAREQEREBERAREQETXOl/S6hs9FaqSWckIi2zNbebnQKLgX5mR3Rn2h4bFuEF0YtlUMQQx+6GsLE8LixOkCa6UbYGGol9CbhVB3Fjrr3Aa+k5rW2xVds7VGJPEn5W4eEy/axtMtXpUkZLIrs4LqCGdhYEXvfKo9ZqVHEHiyeVz+gnFnmZtp9J+lUx0xbmOstg2d0WpbQxILuVpoparTXQ1DmAAVvgU37RGotpa9x17A4NKSKlNVVUGVVUWVRyUcJw/ZG2ThqyVgxbLe6BbBlIsVJJ3fradn2PtRa9FKq3s6hgDa43ggndoQdZrw9o5dOH9WxzGTnjtP90jE0/aXtAwdJ8nWFuZS2XxBPveIFpP7E2tTxNMVKZurX32BBHBgONiD4GdDyUjERAREQEREBERAREQEREBERAREQEt1KoW5PDfuAHiToJWobD6075wPpX03rYqsQjZaIJyKDbTgzc2O/XnJgdkxPSWgvxhv8il/noPnK4bpNhnOXrVDcnBpnwGbsn1nCkxrk3DH1M90tsMjWc3EmYgfRSuD+09TiexvaFVwxFNgHpjcDe4X8DDVfDd3ToOC6c4Z1DFmXjuzj5WPykaTpoPtEdq21qVJtUSijWtzzsT6n5TXuk+ywg62mLaWYDQdx8Zs3T7bOFGLw+LpOlX7NkcIT2cr5kDAjQlajix+7Inpfj8O+HWpRe61PeXS6XG63OZzvmiYdeO1PBmtmhU6+t2Op1JJuSTvJPEyawxOXNaeaOBRlVqLXfiCATpxEydn7BrPUIcUBTAF+scKQ3ed+p793CVtihenG3r2HWpluqF/8pUkeIvpJttsY/wDgEwyJamxINvfylrlXYaZbm9h4Rs3o/Ups2fHUahY5lCE3ABJI1FtxGg000mbtrbhpg06Vus0C8lXi1uJlqY4r1UzcXfLGrdlnCbJpUqLMwzNlJdzqTYa3vum4exvBMmGqOQQtSrdAfuqliR5tl/lmv7HwtbHKmGWy0zdq1QDUKCBYA/ExNgOd+U63gMItJFRFCqoCqo4KNw7+88zJrWY3tnny1vERWNaZMREs5yIiAiIgIiICIiAiIgIiICIiBbrrcW56eun6z5Qy5CVbepKnxU2/MT6yYXE4T7XOgtSjUfG4Zb0nOasg/wAN2Orgf9Njr3EnhumBr3R+g9estGipZiCTyAG9m5D9xLHSDDNSY59GGkk+g23/AOFpFnFNFJC5RrXxDXIAJPuJcjf/AFlr2mYzNVSiVGdAGcj7zLfL3gX+UrzTzab+HHh82+rWWrEgG+t/0k5sd3qU7KbZQSx7WiggblBJN2AAAN5qjMZufQVlGYMxpm6f+ospWmGLXWzfE+ltD7spnvNMc2hnSN20w9uZnZ1U1AisCqMgXUoAM197MCD+EG2hMsbTw6Yel1PxsAzDfYnWx8puibGCYWlXcswqu9QZ/ey3azVCdb2yjxnPMZWLVHuSTci536Gc3BZebmp6NMte0vGFxJpm66DmOEvU8e+hp1BpxNt/O5O+YlTSSPRnYK1Hd/4ilSK2yiqjOrBtNLcRO61tRtnWNzp7rbZdb1a2K6ypYhQKmdvDs3C+N5nYJDdXb33UPv3A6gekmMb0EpOC1XGLUCg/8qkaVNT+J2N28AJD7VxqGpenqgAVfBQAD8pEW3K1qTWNy6H7KMWBXq076slwOJNN1OnPRjp3TqwcH9tx9DORezgLSpdYP+ZVDDPZbr2suVSdQ1uWlxrJ7o70mxBzdfbqy1qaMpNQKvZJJvdrG1zxIa005JnqxmXQYmnYXpkVqihiMPVp1CbDKpdGPdmswuNd5sJIY/pRTojM61Mht21VWTXQXYMQL95EzW1LYYkPsvpFQrkBKgLHcp7LHwB0byMl1N4QrERAREQEREBERAREQEREBLOKoq6lWUMCCCDqGUixUjkRL0QPlzplso4HG1qAPZVg1MnU5GAdPEgEDxBkHisRUquzu1y2pP13CdY9u+yQGoYkDUhqLd+X7RPkzjynKqdAtuHjLD1s/DZmAm2dE8PVdqhpL1hFWj9gSoDW6xutYnUKmX4d97SFw1DILcTv+uU2Xodh6VQW61KdZmrCqTfP/DdTcijyJs3a4WHdOfiv2phpj8zddqJUqUcHQzAg0OsYqOyxVh2u5STcTj/SPBtTqm+/Q35q2ob0M6l0d2l9js1r6Phq2FPHVWUjTnamZc6cdEOtpqaakVETMB95STmp35i9xoOInm4csYc877T0n2b2rzUcUzyQ2btCpRN6blSJYqYMqTcaS2+e2i6T2nNEzE7hl4natatfrqzvfhfs+k8UapdkpoQpdgtzuFza8xf4Wqfh+u+TfRbZpbFUkVgalyQd4BUE2txvu/tM8luSk29ITG7T1bHs9alBlw4LdpEZDm1vV1N77u1c917Sxtva5N1qO2am4HZupDIbanibibLsTY64jGuLJTWjRplVUk3ZmqEhmFtbLm04MDxmo+0LDdXiWb/qBah72Iyt/uQnznFwfG3vbwrem/z6NcuKIjmhjU+meJIfPUL5jcA8LtdhmGtiDaTGA6V4d3+2NVc4GcUyGpnsdWLoRoQu5dwsDvmgkW8JZJsZ6EViGPNOtRLsOAwoqa4TF0q6jXI/2dXTXwvp3ToXRfbfW5qVQjrqYGcBla43ZiVPvDQHxE+Ykrkag+fH13zpXsY2nWqYoUM16VOlVezAMRchcquRdQWe9u6Tb2Vd3iUErKhERAREQEREBERAREQEREDmPttytRoId/Wu/klNVP8A5zk2Hyrv3DUgflOq+25bJhm5VKi/6kRv/wAzk9Ldpx+t8tCV523ndf5TZOggSp9gWZGaqtRnVM2aktGqHpFvhBB+ZmuVk7Hjv/YSY6M1CUakKrUrlqhIB7Qp02JRrcxe3jObjP2paYvMkuiaHFYLFUaZ+0oMMRQ5rYnQenznTOiu21x9GlWAsSMjrr2XTePW1uc490P2ucHjadT4dRUXmj7/ADGh8puGIqnZOPLL/wCzxZ6wNrlUmxzDkQCR4ETh4jFy5J9+v3j/AD/1pS24TnSvoemKJqIqU64JBOmSoARbOBxtxt6zm+2OjNXDnK6vTNwD8Sklt6sNDcflO2YDEI7Zg3YYE6MLG/HTTdxHKW6KXGUakbsxBGjWANz3SmHjLY413gtjiXBn2WWPaZiGzC+4XF9PkJtPR3ZjUsOzdQ1VqqmouTsDsXspqX95gGIW29hffOgfw1FmuaFDMCNAqkDWzHUWG7ebTH2KExLP1VZMqsxp9WAFRbi9wCRmYgkX1sAbCRxPG+NTlrVamLkncyh+i2xBhkK1QBUqsatXLoqkkkJTPBVBt5TWvaPgr11UG69QpBOu96hB9J0mob5cMV1qmwtvUAHOTbcAAe1uuwF5pHtAKVMW4pkWpolK3etzbutmAmf6dS1s/iW+e/z6dFs1o5eWHJKl1HPmO6WnQkZrHLuvY28LyWr0Ab3E7l7J8VTr7Np0rD7IvSdSFIvcuCykWOZWBv3Ge+43zkL3AAJJNgBqSTuAHEz6G9kXQt8DRarXFsRXyll400XVaZ/ESczeQ4TbMH0YwdKp1tLC4enU++lGmr68mAuPKS6i0jaFYiJAREQEREBERAREQEREBERA5j7cVvh6A/75/wDqM5Nhxuvw4TrPtke4oJzNVvQU0/VpyitYaC/CWhKmMxIy279fKTfRpw9MUc6I9R1szDX3XBQG1xckXms4tdPyk30Pxa0zVVyqipTIDst+rbMpD92otfvnNxcTOGdL4vNCMx+JFwRv4/1m67A2vTx2BOCr6mn7hPvAW0I5gajwtNRx+xqivURxZkJJ5ajMCLaWIIPnI7C56Lq6khh+W6xkcVg8fH8M6mOsSnHbkt17Nr2d0oxOzj1FfM+HUjKy6MvgeX4T5Tf9m9McPXAahVVnHwk5SdNxzanXu3znX/E1rLc2DjQg8dPnMzZewko1FxDUbOqGtTB7NMAaK9Y8ib5UAu2nCePlrFt88TW3t2mf4+zprOu3WGz7W27RrU/dFYCvc2qFFUqCVVnJ+0UkEm2mW4+K8tbR6fUaJy0M1aubhVS5BZtSCALG54LczT8ZT/icvW6gEkKoyLmc3Zio+InefLQTP2e1HBgsoCuRYZfet475WK44iI6zPyiPv/pPX+Gz4LalTA0quMxbdZjKqgMPhpj4MOltL31Yj9JzMbSbMzObu5LFuZbX9ZnbSrV8U12BCKeyg5/e7zIqrhTexvbnPY4PBekTbJ3n5fKI9HNktE9K9ipiQdeJm4+yLbfVY7qb2TErl7usS7Uz/wCS/wAwmnPgHA4/nLeGSpSdXQkOjBlI4FTcH1AnYyfWCm4vzlZH7C2iuIoU6y7qiK47sw1XxDZh5SQlUEREBERAREQEREBERAREQEoxtrKyP23jxQovUPwC9ubblXza3oYHLvahietxQpj/AAUCm33mJdh/uUeRmkNheHP18pMYmozFmc3ZiSTzJNyfUzHNO3r4fQlkojHYIAeFvyvbwmb0Wpqr5mprUp+66PuKnXhqDpcS7i6BINt3HmRbh628572EpRrEaqb20946Ad/DSVvXmrMJidS2Ha1EFQ6FWpm6IyHNenT7Chj97KVuJrm0dmgsxBF7MfG50+U23a2EqdVSGRKbKrVHohSubKbdZTJ0PZC3XfpfWReE2PUao7VqLKlNG0dhTps1xYVag1QajQdpjoLamc2LNWmKIvPWOnuvaszbojdjbKpKi18RUSnc3pKyGpmyntOUG8aEKptmIPAGR209rGtUqFGqCmXzZXbOxNrZ3PFu7ct7DSTmL2gXXqQi0ad7ulMhgz6drPxA1AA0AvvveYH/AAtfeUeI39x8BujHi8SfEyR37R6E25elUT11XmQPSSWx9nl8xYbr3vv5+Y/aTNLAAWsAdAddQezf9/SXKeFJJOqhgPIjv7iB850UxUp5YUm0z3ZeGppkBAXsnT9iOPH0mFtrZWY56a9oC+m485epLZrkEA2B8Qd/iD6gjlJfD0ybkDKDvHfytwvvFpcQGz6SVKeYLu0YcQef9DKvsxCRoOYPA33WPfLWIpNh6xdL5W3ge6fGTwKkA30Ovk35j9RA2ToHi1p0xQ3akpfddtWTuudR3k85uqm85TRxApnU6HTu/vN/2FtQVRYntC1+8HQOPyPkZEolMRESEEREBERAREQEREBERATnXtM2wL08Op1J6xvCxVAfLM1u8ToNdgBqbDieQ4n0vPnXbO2jia9Wuf8AEYsBxC3so7rKFEmEwyqtUN56ehmNjMaEFmG/Xnv4TCGO+uXhMPaFmGYX00t+UkTewMHXxtU06JRcupaowAUE6Gx95tNw+U6XgOjFLZuHq4gIcRXRS4zcSPugaKNeGtuM4fQrlDfgdD+86b0B231jU6dWpUNTDLVbDqr2StmX/l1B8RFuz3Hunm8bN99/h/O7bHEJ/a1ertHB0FejUo4ip1jo6KTTQ0vvt8KONBfn3TnVJOywvZT2ioLZcwJBaxJ1vx75u2N6ZVzs0tiKYo1qzNTQLcXQC7MFJuth2fGaBSr6acB9eMvwePmjnt9EXnXSEmVAIsN4sR4X/W0u4auBZt9r+hsLH1kQuLJ38j69mXlxG7zH5f09J3sk7h62hAtpm4623i0zv4gHMD7oHrcfR9ZrODq21vrc6/tM9sR4aAD9v2gTbVvcuBruPeN69508wZ5fG3vqB2gNdAQe/mCPnI3D4qym4uQLDxBJ3eZmPWxIJF9xINt+6/y1EJS2LqBlKlLqRdgTre9tD4G0wlxmUMgJAAsL6nhw8N4mEcUeZFtDb1GvH+kxK2JGYa358t26/l8hCGfUxffy3X5fMWt3yb6Mbd6qojMeyNG1v2Do1/C9/wCWadWxF9OXEcdefGUp44agC39vnCX0bTOnfu9J6mBsOtnoUn+9Tpt601Mz5VUiIgIiICIiAiIgIiIER0rJGDxBXeKNa3j1Tf1nzU1Ts3n030gUnD1gNSadUDzpPPmOil18v0kwmFkVZdWrz+u+YjmUFSSMjquI7vTumdhajIVKEhlOYMDqCDcWmAtWX1a2olbUi0atCYmY7J7bfSOvjXV6xF1XKLCw3E3tzJ1MwVa9gNALfMCYOf68Z7V+/lJrWKxqETO2Sr2v4j85c6y3lr8h+8wy+n1wMqHvr9cpIkKdUjj9HlLwr777jIxa3y/qJ6NbT6+uECVfFd/9xb9RLVSsN1wP7/loJHmtfw/UcZ5evu3f3gSJxW7h+VxbUzFxFS4vYa62/EDw7v6TDq4g+Y/SWnqbvr63wM2pXvYiWqtTQm/9pi9b9eUo93IRd7kKPFjb8zCX0v0SS2DwwO8UKI/+Nf3kxLGEohFCjctlHgoC/pL8qqREQEREBERAREQEREDG2ghNNgN5DAeJRgPmRPlynV077D8uU+qau492vprPmrprg+ox+JpWsoqsyj8NT7Rbd1nHpJhMNfrrxGsxs0y0fhwPzmLWXlJHtHl8P+kwVaXUqQM6m1yZ6LfXlMVHnsPAyM8Fpj9ZPZfUQLyVLSpaY15TPAyXq2EttUll30ngtAus88Z5bLzxngXy82D2d4D+J2lh1tdKbdc/ctHt6/zBR5zVHqTtvsH2OFw1XEsO1WqFFP8A26Vr28ahIP8AkkDqlMaC+/j4z1ESEEREBERAREQEREBERATjXtv2IVali13H7B+4i7U2PiMy3/CJ2WRu39k08VQqUKoulRbHmOIZfxKQGHhA+VVfX9pQ/lM/pJsStgcQ2HrDUahh7rqfddTyPyNxwkY7SyVtllA0oWmw9FuhWN2gC1BFWmNOtqsUpk/dU2JY+ANuMCCV5cDzYtp+zjalAm+FNVR8dFhVU+Q7Xqs1ipdSVYFWGhBBBB5EHUGBeDypeY+aC0IZHWWlOsmPnnktCV8vKM8slpIbF2Di8aSuFw71baEqOyv+ZzZR5mBg555JnTdkexXFOL4jE0qR4LTVqx/mN1UeRMgunfs+q7MSnUNdKyO/V3CmmytlLAFSTcEA6gyBrWx9lV8XWWhh0L1H3AbgOLMfhUcTPqjoxshcJhqWHQ3FJAt/vHUs/wDMxYzWvZLszC0tn0XoWZqqhqzgXY1dc1NyNQEOgXz4zd+sHh4giEPcSgN90rICIiAiIgIiICIiAiIgIiIGp9PuhtLaNDIezVS5o1PusfgbmjaAjgbGfNJwlQ1OpVGaoWKhFBZiw0IAGpOhn1rWx9MOtMuocjMEv22C63C8B3mc76CbBp4LHYh3qh6mIBKFgAV+0LOFbgGuB5CNrRS0xvSA6CeyNnK1togqL3GGBsxHOs490fhGvO26dpwmFSmqoiqqqMqqoCqoG5VUaKJdp2toLd09Qq8sgPD9/Wa90l6F4PHa4iirMNBUBKVR3dYurDua82OIHIsd7EKJJ6rFVkHJ0SoB5qVPykZU9h9X4ccvnQcfMMZ3CJOxw3D+w+sT28cgH4aDk/7mEk8N7DqN/tMXXYckp00+bFvynX4kbGgbM9kmzKRu1FqxHGtUZh/oTKp87zdsHgKdJBTpoqIu5FUKg8EGkyYgJp/tM6MPj8MtOnlzpUWouclVNlZGUsAbGzXF+U3CITE6cHomvs5clWjVw2urbkY8+tQlW9ZPbN6SF0FsSyte4YMSP5hfUTqzUQQRbQ7xwPiNxkLi+h+BqG7YWjc72VOrb/XTymUmvpLqrxMf1Va3s7puy1OqxKgOLG40zA7mVha4PfN5wOLWqoZTcHjuOhsQRzBEhm6F4I5c1BGKAhS5qOQCb2BLX4Scw2HWmoVQAALAAWAHcJNYmO7PNfHbyxpeiIlmBERAREQEREBERATxV3eJAnuUIgc42jgcX/G/xpTLSANPtEh+3lUNktot9LmRxwWLfFUqyUHagmdGdbH3io0W+ZhodQNJ1bqhyt9fOOqHEXPM/pymfh9XXHFzEa1+ejD2MHFJRUBDBQDffoWtfvy5ZnyigDdKzSHLadzMkREIIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgf//Z";
        allTickets = [[1753408969304, 1753409069304],[1745408969303,1745409069303],[2743408969303,2743409069303],[1743408969103,1743409069103],[643408969303,743409069303]]; //ms dal 1970

        fillTicketsLists();
    }

    // metti date cambio
    //inizializza biglietti filtrandoli tra viaggi futuri e passati
    function fillTicketsLists(){
        for(let i = 0; i< allTickets.length; i++){
            if(allTickets[i][1] > timeNow){
                currentTicketsStart.push(new Date(allTickets[i][0]).getHours() + ":" +new Date(allTickets[i][0]).getMinutes() + " " +new Date(allTickets[i][0]).getDate() + "/" + new Date(allTickets[i][0]).getMonth() + "/" + new Date(allTickets[i][0]).getFullYear());
                currentTicketsEnd.push(new Date(allTickets[i][1]).getHours() + ":" +new Date(allTickets[i][1]).getMinutes() + " " +new Date(allTickets[i][1]).getDate() + "/" + new Date(allTickets[i][1]).getMonth() + "/" + new Date(allTickets[i][1]).getFullYear());
                
            }else{
                oldTicketsStart.push(new Date(allTickets[i][0]).getHours() + ":" +new Date(allTickets[i][0]).getMinutes() + " " +new Date(allTickets[i][0]).getDate() + "/" + new Date(allTickets[i][0]).getMonth() + "/" + new Date(allTickets[i][0]).getFullYear());
                oldTicketsEnd.push(new Date(allTickets[i][1]).getHours() + ":" +new Date(allTickets[i][1]).getMinutes() + " " +new Date(allTickets[i][1]).getDate() + "/" + new Date(allTickets[i][1]).getMonth() + "/" + new Date(allTickets[i][1]).getFullYear());
                
            }
        }
    }
    
</script>

<template>
    <div class="container-fluid">
        <!--Titolo-->
        <div class="w-100 text-center my-2"><h1 class="fw-bolder">Area riservata</h1></div>

        <!--Div informazioni utente-->
        <div class="row mb-3">
            <div class="col-6"><h2 class="fw-bold">Bentornato {{ username }}!</h2></div>
            <div class="col-6"><img :src="userPfpSrc" alt="pfp" style="height: 2.5vw;" class="rounded"></div>
        </div>
        <!--Div dei biglietti-->
        <div class="row">
            <!--Riga 1-->
            <div class="col-6">
                <h3>Viaggi futuri</h3>
            </div>
            <div class="col-6">
                <h3>Cronologia viaggi</h3>
            </div>
            <!--Riga 2-->
            <div class="col-6">
                <Ticket v-for="(ct, index) in currentTicketsStart" :dateTimeS="currentTicketsStart[index]" :dateTimeE="currentTicketsEnd[index]"></Ticket>
            </div>
            <div class="col-6">
                <Ticket v-for="(ct, index) in oldTicketsStart" :dateTimeS="oldTicketsStart[index]" :dateTimeE="oldTicketsEnd[index]"></Ticket>
            </div>
        </div>
        
    </div>
</template>
  
<style>
</style>  
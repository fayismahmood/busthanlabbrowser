<script>
  import { db, log } from "./db";

  let adno;
  let password;
</script>
<div class="login">
 
<div>
  <div>
    <img src="./logo.svg" alt="">
  </div>
  <div class="lg">
    <div class="inp">
      <label for="">AdNo</label>
      <input bind:value={adno} type="text" />
    </div>
    <div class="inp">
      <label for="">Password</label>
      <input bind:value={password} type="password" />
    </div>
    <button
      on:click={async () => {
        db.signin({
          SC: "std",
          NS: "lab",
          DB: "data",
          adno: adno,
          pass: password,
        })
          .then(async(e) => {
            db.query(`select NAME,ADNO,CLASS from $auth.id`).then(
              async(e) => {
                let user = e[0].result[0];
                console.log(e,"USER");
                let classrooms=await db.query(`select * from classroom where stds contains $auth.id`)
                classrooms=classrooms[0].result?.map(e=>e.id)
                //let classrooms = e[0].result[0]?.classroom.map((e) => e.id);
                db.query(
                  `select *,classroom.name as classname from perm where classroom in ${JSON.stringify(
                    classrooms
                  )}`
                ).then((e) => {
                  let Perm = e[0].result;
                  log.set({ logged: true,user,perm:Perm });
              // console.log(Perm,"QQQQQQQQQQQQQQQQ");
                  
                });
              }
            );
            
          })
          .catch((e) => {
            alert("Error");
            console.log(e);
          });
      }}>Login</button
    >
  </div>
</div>
</div>


<style lang="scss">
  @import "../vars.scss";
.login{
  display: flex;
  width: 100%;
  height: 100vh;
  background: rgba($terl,.1);
  &>div{
  

    margin: auto 160px ;
    height: max-content;
    .lg{
      border:solid 1px  $terl;
  background: white;
  padding: 20px 35px;
    border-radius: 5px;

    }
  }
  .inp{
    margin:20px 0 ;
    label{
      display: block;
      color:rgba($pri, 0.821) ;
    }
    input{
      padding: 5px 12px;
      font-size: 18px;
      border: solid 1px $ter;
      border-radius: 3px;
      margin-top: 5px;
      width: 300px;
    }
  }
  button{
    background: $sec;
    color: $terl;
    padding: 8px 20px;
    border: none;
    border-radius: 3px;
    padding-right: 40px;
    font-size: 16px;
    cursor: pointer;
  }
}

</style>
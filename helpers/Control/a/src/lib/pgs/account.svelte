<script>
  import { db } from "../db";

    let newPsw=[]
</script>

<div>
  <div>
    <h2>Change Password</h2>
    <div class="inp">
      <label for="">New Password</label>
      <input bind:value={newPsw[0]}  type="password" name="" id="">
    </div>
    <div class="inp">
        <label for="">New Password</label>
        <input  bind:value={newPsw[1]} type="password" name="" id="">
      </div>
  </div>

  <button class="pri" on:click={()=>{
    if(newPsw[0]==newPsw[1]){
        db.query(`UPDATE std SET pass=crypto::argon2::generate("${newPsw[0]}") where id= $auth.id`).then(e=>{
            alert("Changed...")
            window.location.reload()
        })
    }
  }}>
    ChangePassword
  </button>
</div>

<style lang="scss">
  @import "../../vars.scss";
  
</style>

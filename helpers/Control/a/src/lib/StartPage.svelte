<script lang="ts">
  import { onMount } from "svelte";
  import { db, log } from "./db";
  import { PrmTypes } from "./prm/PrmTypes";
  export let tabs=[];


  onMount(() => {
    // document.querySelectorAll("a").forEach(e=>{
    //   e.
    //   e.onclick=(ev)=>{
    //     ev.preventDefault()
    //     tabs.push({url:e.href,title:e.textContent})
    //     tabs=tabs

    //   }
    // })
    document.querySelector(".startpg").onclick = (e) => {
      if (e.target.tagName == "A") {
        let id = Date.now();
        e.preventDefault();

        tabs=[...tabs,{ url: e.target.href,id, title: e.target.textContent }];
         
         console.log(tabs,"S");
         
      }
    };
  });
</script>

<div class="pg startpg">
  <div class="w">
    <div>
      <img width="120" src="/logo.svg" alt="" />
    </div>
    <div class="cont">
      <div class="head">Permissions</div>
      <div class="body">
        {#each $log?.perm || [] as e}
          <li>
            <span>{e.classname}</span>
            <svelte:component this={PrmTypes[e.type]?.comp}  cont={e} />
          </li>
        {/each}
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import "../vars.scss";
  .pg {
    width: 100%;
    height: 90vh;
    overflow: auto;
    background: rgba($terl, 0.1);
    display: flex;
    .w {
      padding: 90px;
    }
  }
  .cont {
    background: white;
    border: solid $ter 1px;
    
    border-radius: 3px;
    width: 80vw;
    .head,
    .body {
      padding: 10px 30px;
    }
    .head {
      font-size: 20px;
      color: $pri;
      border-bottom: $ter 1px solid;
    }
    .body {
      color: rgb(68, 67, 67);
    
      
      li {
        display: block;
        border: solid 1px rgba(128, 128, 128, 0.33);
      border-radius: 10px;
      padding: 5px 15px;
      margin: 10px 0;
        span {
          padding: 2px 6px;
          background: $terl;
          font-size: 15px;
          color: $pri;
          border-radius: 5px;
          display: block;
          margin: 5px 0;
          width: max-content;
        }
      }
    }
  }
</style>

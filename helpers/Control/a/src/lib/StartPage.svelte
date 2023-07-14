<script lang="ts">
  import { onMount } from "svelte";
  import Permission from "./pgs/permission.svelte";
  import Account from "./pgs/account.svelte";
  export let PageTabs=["permissions","account"];
export let tabs;


  let tabDet={
    permissions:{
      comp:Permission
    },
    account:{
      comp:Account
    }
  }
  let actTab="permissions"

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



<div class="acc">
  <div>
    <img style="margin-top: 10px; margin-right: 30px;" width="80" src="/logo.svg" alt="" />
  </div>
  {#each PageTabs as e}
    <button on:click={()=>{actTab=e}} class={`${e==actTab?"act":""}`}>
      {e}  
    </button>
  {/each}
</div>

<div class="pg startpg">
  <div class="w">
    {#if actTab}
     <svelte:component this={tabDet[actTab].comp} ></svelte:component>
  {/if}
  </div>
</div>

<style lang="scss">
  @import "../vars.scss";
.acc{
  display: flex;
  margin: 16px 30px;
  border-bottom: 2px solid $terl;
  
  box-sizing: content-box;
  button{
    background: none;
    border: none;
    height: max-content;
    padding: 5px 10px  ;
    margin:0 5px;
    margin-top: auto;
    font-size: 18px;
    color: $pri;
    cursor: pointer;
    transition: all;

    &.act{
      font-weight: 600;
      transition: all;
      border-bottom: 3px $pri solid;
    }
  }
}
  .pg {
    width: 100%;
    height: 75vh;
    overflow: auto;
    background: rgba($terl, 0.1);
    display: flex;
    .w {
      padding: 90px;
    }
  }

</style>

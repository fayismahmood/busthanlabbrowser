<script>
  import { db, log } from "./../db";
  import { PrmTypes } from "../prm/PrmTypes";
</script>

<div class="w">
  <div class="cont">
    <div class="head">Permissions</div>
    <div class="body">
      {#each $log?.perm || [] as e}
        <li>
          <span>{e.classname}</span>
          <svelte:component this={PrmTypes[e.type]?.comp} cont={e} />
        </li>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  @import "../../vars.scss";
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

<script>
    export let cont={};
    
    let urls=cont.url?.replace(/[\(,\)]/g,"").split("|")?.map(e=>e.replace(/\\/g,""))
</script>
<div class="e">
    {#each urls as e}
        <li>
            <a class="link"  href={e}>{e?.substr(0,60)+"..."}</a>
        </li>
    {/each}
</div>

<style>
    .e{
      
    }
    a{
        color: rgb(19, 98, 195);
        text-decoration: none;

    }
    a:hover{
        text-decoration: underline;
    }
</style>
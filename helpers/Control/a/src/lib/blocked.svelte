<div class="pg">
<div>
    <img width="100" src="/lock.png" alt="">
    <h2>
        This site is blocked
    </h2>
</div>
</div>

<style lang="scss">
    @import "../vars.scss";
.pg{
    display: flex;
    width:100%;
    height: 100vh;
    background: rgba($terl,0.1);
    &>div{
        margin: auto;
        display: grid;
        place-items: center;
        color: $pri;
        img{
            transform: translateY(50px);
            animation: an 3s infinite;
        }
    }
}
@keyframes an{
    0%{
        transform: translateY(50px); 
    }
    50%{
        transform: translateY(45px);
    }
    100%{
        transform: translateY(50px);
    }
}
</style>
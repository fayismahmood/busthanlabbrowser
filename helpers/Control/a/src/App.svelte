<script>
  import { log } from "./lib/db";

  import PageNotFound from "./lib/PageNotFound.svelte";
  import {
    isValidDomain,
    isValidUrl,
    processSearchBar,
  } from "./lib/domainCheck";
  import Login from "./lib/Login.svelte";
  import StartPage from "./lib/StartPage.svelte";
  // const ipc = require('electron').ipcRenderer
  //const { ipcRenderer } = window.require("electron");
  import { matchPattern } from "url-matcher";
  import Blocked from "./lib/blocked.svelte";
  import { onMount } from "svelte";

  let Logged;
  let Perm;
  log.subscribe(({ logged, perm }) => {
    // console.log(logged, "e");
    Logged = logged;

    Perm = perm
      .map((e) => {
        // if (isValidUrl(e.url)) {
        //   return new URLPattern(e.url);
        // } else {
        //   if (isValidDomain(e.url)) {
        //     return new URLPattern({hostname:e.url,search:"*",pathname:"/*",protocol:"http{s}"});
        //   } else {
        //     return null;
        //   }
        // }

        return e.url;
      })
      .filter((e) => e);
  });

  let tabs = [];
  let actTab;

  let errors = {
    "-105": PageNotFound,
  };
  function checkValid(url) {
    return Perm.some((e) => {
      let _ = new RegExp(e);
      //console.log(_.test(node.getURL()),"Afasf");
      return e == url || _.test(url);
    });
  }
  function updateTitle(node, tab) {
    let domReadyFunc = () => {
      //console.log("Ready");

      tab.ready = true;
      //tabs = tabs;
    };

    let didStartLoading = () => {
      tab.loading = true;
      // tabs = tabs;
    };
    let didStopLoading = () => {
      tab.loading = false;
      //node.stop();
      // tabs = tabs;
    };
    let willNavigate = (q) => {
      if(checkValid(q.url)){
       // console.log(q, "DDDDDDDDDDDDDD");
        tab.url = q.url;
        tab._url = q.url;
      }else{
        tab.url = "pg://blocked";
      }
      tabs = tabs;
    };
    node.addEventListener("did-fail-load", (err, errDisc, valUrl) => {
      console.error(err, errDisc, valUrl);
      // tab.error = true;
      // tab.errorCode = err.errorCode;
      // tab.loading = false;
      // tab.title = "PAGE ERROR";
      // tabs = tabs;
    });
    node.addEventListener("dom-ready", domReadyFunc);

    node.addEventListener("page-title-updated", () => {
      if(checkValid(node.getURL())){
        tab.title = node.getTitle();
        tab._url = node.getURL();
        tab.url = node.getURL();
        tab.canGoBack = node.canGoBack();
        tab.canGoForward = node.canGoForward();
      }else{
        tab.url = "pg://blocked";
      }
      tabs = tabs;
    });
    node.addEventListener("will-navigate", willNavigate);
    node.addEventListener("update-target-url", () => {
      // if (tab.url == node.getURL()) {
      //   console.log("NOOOO");
      //   return false;
      // } else {
      //   console.log(tab.url, node.getURL(), "dddd");
      //   if (
      //     !Perm.some((e) => {
      //       let _ = new RegExp(e);
      //       //console.log(_.test(node.getURL()),"Afasf");
      //       return e == node.getURL() || _.test(node.getURL());
      //     })
      //   ) {
      //     tab.url = "pg://blocked";
      //     //  node.stop()
      //     tab.loading = false;
      //     tabs = tabs;
      //   } else {
      //     tab.title = node.getTitle();
      //    /// tab.url = node.getURL();
      //   node.s
      //     tab._url = node.getURL();
      //     tabs = tabs;
      //   }
      // }
    });
    //node.addEventListener("did-start-loading",didStartLoading);
    //node.addEventListener("did-stop-loading", didStopLoading);

    // node.addEventListener("did-finish-load", () => {
    //   //tabs = tabs;
    // });
    return {
      destroy() {
        node.removeEventListener("dom-ready", domReadyFunc);
        node.removeEventListener("will-navigate", willNavigate);
        node.removeEventListener("did-start-loading", didStartLoading);
        node.removeEventListener("did-stop-loading", didStopLoading);
      },
    };
  }

  $: {
    //  console.log(tabs);
  }
</script>

{#if Logged}
  <div class="tabs">
    {#each tabs as tab}
      <div
        class={`eTag ${actTab == tab.id ? "act" : ""}`}
        on:click={() => {
          actTab = tab.id;
        }}
      >
        {#if tab.loading}
          <span class="loader" />
        {/if}
        <span>
          {tab.title}
        </span>
        <button
          on:click={() => {
            tabs = tabs.filter((e) => e.id != tab.id);
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
              fill="currentColor"
            /></svg
          >
        </button>
      </div>
    {/each}
    <button
      class="adder"
      on:click={() => {
        let id = Date.now();
        tabs.push({ url: "", id, title: "NewTab" });
        tabs = tabs;
        actTab = id;
      }}
    >
      <svg
        width="30"
        height="30"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </button>
    <button
      on:click={() => {
        window?.electronAPI.close();
      }}
      class="closeBtn"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
  <div class="view">
    {#each tabs as tab}
      <div class={`eView ${actTab == tab.id ? "vi" : ""}`}>
        <div class="inp">
          <button
            on:click={() => {
              tab.webview.goBack();
            }}
            disabled={!tab.canGoBack}
            on:click={() => {}}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <button
            on:click={() => {
              tab.webview.goForward();
            }}
            disabled={!tab.canGoForward}
            on:click={() => {}}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
          <input
            bind:value={tab._url}
            on:keydown={(ev) => {
              if (ev.key == "Enter") {
                tab.error = false;
                tab.errorCode = null;
                tab.url = processSearchBar(tab._url);
                tab = tab;
              }
            }}
            type="text"
          />
        </div>
        {#if tab.error}
          <svelte:component this={errors[tab.errorCode]} />
        {:else if tab.url == "pg://blocked"}
          <Blocked />
        {:else if tab.url == ""}
          <StartPage bind:tabs />
        {:else}
          <webview
            use:updateTitle={tab}
            bind:this={tab.webview}
            src={tab.url}
            style="display:inline-flex; width:100%; height:calc(100vh - 90px)"
            allowpopups
          />
        {/if}
      </div>
    {/each}
  </div>
{:else}
  <Login />
{/if}

<style lang="scss">
  .closeBtn {
    margin-left: auto;
    padding: 3px;
    border: none;
    width: 25px;
    height: 25px;
    cursor: pointer;
    border-radius: 50%;
    &:hover {
      background: rgba(255, 0, 0, 0.182);
    }
    svg {
      width: 20px;
      height: 20px;
      color: red;
      position: relative;
      top: 0px;
    }
  }
  .inp {
    margin: 5px 0;
    display: flex;
    input {
      border: 2px solid gray;
      width: 100%;
      padding: 4px 15px;
      border-radius: 13px;
      margin: 0 10px;
      font-size: 14px;
      color: rgb(71, 71, 71);
    }
    button {
      height: 30px;
      width: 30px;
      background: white;
      border: 1px lightgray solid;
      border-radius: 5px;
      margin: 0 5px;
      color: rgb(2, 2, 2);
      display: flex;
      &:disabled {
        color: gray;
      }
      svg {
        margin: auto;
        width: 25px;
      }
    }
  }
  .eView {
    display: none;
    &.vi {
      display: block;
    }
  }
  body {
    margin: 0;
  }
  .adder {
    border: none;

    svg {
      height: 20px;
      width: 20px;
    }
  }
  .tabs {
    display: flex;
    background: rgba(211, 211, 211, 0.416);
    padding: 5px;

    .eTag {
      display: flex;
      padding: 2px 10px;
      line-height: 1.7;
      border-radius: 5px;

      cursor: pointer;
      height: 25px;
      span {
        max-width: 150px;
        overflow: hidden;
      }
      &.act {
        background: white;
      }
      button {
        height: 20px;
        width: 20px;
        border: none;
        background: none;
        cursor: pointer;
        padding: 2px;
        border-radius: 50%;
        margin: auto;
        margin-left: 10px;
        svg {
          height: 15px;
          width: 15px;
          position: relative;
          top: 0.7px;
          color: red;
        }
      }
    }
  }

  .loader {
    margin: auto;
    margin-right: 5px;

    width: 15px;
    height: 15px;
    border: 1px solid #160000;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
  .loader::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-bottom-color: #ff3d00;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>

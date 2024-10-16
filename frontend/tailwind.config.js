/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'QBG':"url('../public/assets/quidditch.jpeg')",
        'harry-bg':"url('../public/assets/bg-1.png')",
        'howards': "url('../public/assets/howards2.png')",
      },
      fontFamily:{
        'harry':["HarryP",'sans-serif']
      },
      keyframes: {
        bigger:{
          "0%":{
            width:"0"
          },
          "100%":{
            width:"400px"
          }
        },
        fadeIn:{
          "from":{
            opacity:0
          },
          "to":{
            opacity:1
          }
        },
        rotation:{
          "from":{
            transform:"rotate(0deg)",
          },
          "to":{
            transform:"rotate(360deg)",
          }
        },
        moveField:{
          "from":{
            backgroundPosition:"left",
          },
          "to":{
            backgroundPosition:"right",
          }
        }
      },
      animation: {
        bigger:"bigger 4s linear",
        fadeInAnimation : "fadeIn 1s linear",
        startButton : "fadeIn 1s 1s linear forwards",
        bgAnimation : "moveField 25s infinite linear alternate"
      },
      cursor:{
        harry:'url(../public/assets/cursors/wand.png)',
      }
    },
  },
  plugins: [],
}
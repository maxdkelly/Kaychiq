(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{109:function(e,t,a){},116:function(e,t,a){},136:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),i=a(11),s=a.n(i),r=a(12),o=a(24),l=(a(109),a(13)),u=a.p+"static/media/koreanchicken.ff72deb8.jpg",j=(a(41),a(163)),d=a(180),b=a(165),g=a(167),h=a(138),p=a(2),m=Object(j.a)((function(e){return Object(d.a)({root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}})})),O=function(e){var t=Object(r.f)(),a=m();return Object(p.jsx)(b.a,{position:"static",children:Object(p.jsx)(g.a,{children:Object(p.jsx)(h.a,{variant:"h5",className:a.title,onClick:function(){return t.push("/")},children:"Kaychiq"})})})},f=(a(116),a(87)),x=a(168),k=a(169),v=Object(j.a)((function(e){var t;return{appBar:{position:"relative"},layout:Object(l.a)({width:"auto",marginLeft:e.spacing(1),marginRight:e.spacing(1)},e.breakpoints.up(600+2*e.spacing(2)),{width:600,marginLeft:"auto",marginRight:"auto"}),paper:(t={marginTop:e.spacing(3),marginBottom:e.spacing(3),padding:e.spacing(2)},Object(l.a)(t,e.breakpoints.up(600+2*e.spacing(3)),{marginTop:e.spacing(6),marginBottom:e.spacing(6),padding:e.spacing(3)}),Object(l.a)(t,"backgroundColor","#C4C3D0"),Object(l.a)(t,"borderRadius",10),t),stepper:{padding:e.spacing(3,0,5)},buttons:{display:"flex",justifyContent:"flex-end"},button:{marginTop:e.spacing(3),marginLeft:e.spacing(1)}}})),y=function(e){var t=v();return Object(p.jsxs)("div",{children:[Object(p.jsx)(O,{}),Object(p.jsx)("main",{className:t.layout,children:Object(p.jsx)(f.a,{className:t.paper,children:Object(p.jsxs)(x.a,{container:!0,spacing:6,children:[Object(p.jsx)(x.a,{item:!0,xs:12,style:{textAlign:"center"},children:Object(p.jsx)("img",{className:"pic",src:u,style:{"align-self":"center","max-width":"90%","max-height":"100%","border-radius":"15px"}})}),Object(p.jsx)(x.a,{item:!0,xs:12,style:{textAlign:"center"},children:Object(p.jsx)(o.b,{to:"/createGame",className:"link",children:Object(p.jsx)(k.a,{variant:"contained",color:"primary",children:Object(p.jsx)("div",{className:"buttonText",children:"Create Game "})})})}),Object(p.jsx)(x.a,{item:!0,xs:12,style:{textAlign:"center"},children:Object(p.jsx)(o.b,{to:"/lobby",className:"link",children:Object(p.jsx)(k.a,{variant:"contained",color:"primary",children:Object(p.jsx)("div",{className:"buttonText",children:"Join Lobby"})})})})]})})})]})},C=a(7),S=a(35),w=a(36),G=a(29),T=a(62),N=a(61),L=a(30),B=a.n(L),R=new(function(){function e(){Object(S.a)(this,e)}return Object(w.a)(e,[{key:"createGame",value:function(e){return B.a.post("/api/createGame",{username:e}).then((function(e){return e.data})).catch((function(e){console.log(e)}))}},{key:"joinGame",value:function(e,t){return B.a.post("/api/joinGame",{username:e,code:t}).then((function(e){return e.data})).catch((function(e){console.log(e)}))}},{key:"checkGameStarted",value:function(e){return B.a.post("/api/checkGameStarted",{token:e}).then((function(e){return e.data})).catch((function(e){console.log(e)}))}},{key:"startGuessGame",value:function(e){return B.a.post("/api/startGuessGame",{token:e}).then((function(e){return e.data})).catch((function(e){console.log(e)}))}},{key:"isHost",value:function(e){return B.a.post("/api/isHost",{token:e}).then((function(e){return e.data})).catch((function(e){console.log(e)}))}}]),e}()),E=a(177),D=function(e){Object(T.a)(a,e);var t=Object(N.a)(a);function a(e){var n;return Object(S.a)(this,a),(n=t.call(this,e)).state={username:"",gameCode:"",indToken:"",gameCreated:!1},n.handleUsernameChange=n.handleUsernameChange.bind(Object(G.a)(n)),n.handleCodeChange=n.handleCodeChange.bind(Object(G.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(G.a)(n)),n}return Object(w.a)(a,[{key:"handleUsernameChange",value:function(e){this.setState({username:e.target.value})}},{key:"handleCodeChange",value:function(e){this.setState({gameCode:e.target.value})}},{key:"componentWillReceiveProps",value:function(e){e.token&&this.setState({username:e.token.split("_")[1],gameCreated:!0,gameCode:e.token.split("_")[0],indToken:e.token})}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault(),R.joinGame(this.state.username,this.state.gameCode).then((function(e){e.isValid?(t.setState({gameCode:e.gameToken,indToken:e.individualToken}),t.props.passToken(e.individualToken),console.log(e),t.setState({gameCreated:!0})):alert(e.validMsg)}))}},{key:"render",value:function(){return this.state.gameCreated?Object(p.jsx)(c.a.Fragment,{children:Object(p.jsxs)("div",{className:"titleText",children:[" You have joined game ",this.state.gameCode]})}):Object(p.jsxs)(c.a.Fragment,{children:[Object(p.jsx)(h.a,{variant:"h6",gutterBottom:!0,children:"Join Game"}),Object(p.jsxs)(x.a,{container:!0,spacing:3,children:[Object(p.jsx)(x.a,{item:!0,xs:12,children:Object(p.jsx)(E.a,{id:"standard-basic",value:this.state.username,onChange:this.handleUsernameChange,label:"Username"})}),Object(p.jsx)(x.a,{item:!0,xs:12,children:Object(p.jsx)(E.a,{id:"standard-basic",value:this.state.gameCode,onChange:this.handleCodeChange,label:"Game Code"})}),Object(p.jsx)(x.a,{item:!0,xs:12,children:Object(p.jsx)(k.a,{variant:"contained",color:"primary",onClick:this.handleSubmit,children:"Submit"})})]})]})}}]),a}(c.a.Component),W=a(171),I=a(172),P=a(178),M=a.p+"static/media/apple.e6f58345.png",U=a.p+"static/media/grapefruit.56b4ec34.png",_=a.p+"static/media/original.7364428a.png",F=a.p+"static/media/peach.4b3916d7.png",H=a.p+"static/media/plum.848150eb.png",A=a.p+"static/media/strawberry.e2f74bfd.png",J=a.p+"static/media/watermelon.816a1fa5.png",V=a.p+"static/media/lychee.829c269d.png",Y=Object(j.a)((function(e){return{root:{flexGrow:1},paper:{height:100,width:100},control:{padding:e.spacing(2)}}})),q=function(e){var t=Object(n.useState)([]),a=Object(C.a)(t,2),i=a[0],s=a[1],o=Object(n.useState)(e.token),l=Object(C.a)(o,2),u=l[0],j=l[1],d=Object(r.f)(),b=c.a.useState(2),g=Object(C.a)(b,2),m=g[0],O=(g[1],Y(),Object(n.useState)({})),f=Object(C.a)(O,2),k=f[0],v=f[1],y=Object(n.useState)({apple:M,grapefruit:U,original:_,peach:F,plum:H,strawberry:A,watermelon:J,lychee:V}),S=Object(C.a)(y,2),w=S[0];S[1];Object(n.useEffect)((function(){e.token!==u&&j(e.token)}));!function(e,t){var a=Object(n.useRef)();Object(n.useEffect)((function(){a.current=e}),[e]),Object(n.useEffect)((function(){if(null!==t){var e=setInterval((function(){a.current()}),t);return function(){return clearInterval(e)}}}),[t])}((function(){G()}),2e3);var G=function(){R.checkGameStarted(u).then((function(e){var t;console.log(e),e?(e.gameStarted&&(t=e.gameLink,d.push({pathname:"/"+t,token:u})),s(e.players),v(e.sojuMap)):console.log("Error pinging api")}))};return Object(p.jsx)(c.a.Fragment,{children:Object(p.jsxs)(x.a,{container:!0,spacing:3,children:[Object(p.jsx)(x.a,{item:!0,xs:12,children:Object(p.jsx)("div",{className:"titleText",children:"Lobby "})}),Object(p.jsx)(x.a,{item:!0,children:Object(p.jsx)(x.a,{container:!0,justifyContent:"center",justify:"center",alignItems:"center",spacing:m,children:i.map((function(e){return Object(p.jsx)(W.a,{className:"cardContainer",alignItems:"center",children:Object(p.jsxs)(I.a,{className:"cardContentContainer",alignItems:"center",children:[Object(p.jsx)("img",{src:w[k[e]],width:"80",height:"120"}),Object(p.jsx)(h.a,{component:"div",justify:"center",alignItems:"center",children:Object(p.jsx)(P.a,{fontWeight:"fontWeightBold",m:1,style:{"text-align":"center"},children:e})})]})})}))})})]})})},K=Object(j.a)((function(e){var t;return{appBar:{position:"relative"},layout:Object(l.a)({width:"auto",marginLeft:e.spacing(2),marginRight:e.spacing(2)},e.breakpoints.up(600+2*e.spacing(2)),{width:600,marginLeft:"auto",marginRight:"auto"}),paper:(t={marginTop:e.spacing(3),marginBottom:e.spacing(3),padding:e.spacing(2)},Object(l.a)(t,e.breakpoints.up(600+2*e.spacing(3)),{marginTop:e.spacing(6),marginBottom:e.spacing(6),padding:e.spacing(3)}),Object(l.a)(t,"backgroundColor","#C4C3D0"),Object(l.a)(t,"borderRadius",10),t),stepper:{padding:e.spacing(3,0,5)},buttons:{display:"flex",justifyContent:"flex-end"},button:{marginTop:e.spacing(3),marginLeft:e.spacing(1)}}})),z=function(e){var t=K(),a=Object(n.useState)(""),c=Object(C.a)(a,2),i=c[0],s=c[1];Object(n.useEffect)((function(){e.location.token&&s(e.location.token)}),[]);return Object(p.jsxs)("body",{children:[Object(p.jsx)(O,{}),Object(p.jsx)("main",{className:t.layout,children:Object(p.jsx)(f.a,{className:t.paper,children:Object(p.jsx)(D,{passToken:function(e){console.log(e),s(e)},token:i})})}),Object(p.jsx)("main",{className:i?t.layout:"hidden",children:Object(p.jsx)(f.a,{className:t.paper,children:Object(p.jsx)(q,{token:i})})})]})},Q=function(e){Object(T.a)(a,e);var t=Object(N.a)(a);function a(e){var n;return Object(S.a)(this,a),n=t.call(this,e),console.log(e),e.token?n.state={username:e.token.split("_")[1],gameCreated:!0,gameCode:e.token.split("_")[0],indToken:e.token}:n.state={username:"",gameCreated:!1,gameCode:"",indToken:""},n.handleChange=n.handleChange.bind(Object(G.a)(n)),n.handleGuessLink=n.handleGuessLink.bind(Object(G.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(G.a)(n)),n}return Object(w.a)(a,[{key:"componentWillReceiveProps",value:function(e){e.token&&this.setState({username:e.token.split("_")[1],gameCreated:!0,gameCode:e.token.split("_")[0],indToken:e.token})}},{key:"handleGuessLink",value:function(e){R.startGuessGame(this.state.indToken).then((function(t){t.isValid||(alert(t.validMsg),e.preventDefault())})),console.log("hey")}},{key:"handleChange",value:function(e){this.setState({username:e.target.value})}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault(),console.log("hey"),R.createGame(this.state.username).then((function(e){t.setState({gameCode:e.gameToken,indToken:e.individualToken}),t.props.passToken(e.individualToken)})),this.setState({gameCreated:!0})}},{key:"render",value:function(){var e=this;return this.state.gameCreated?Object(p.jsx)(c.a.Fragment,{children:Object(p.jsxs)(x.a,{container:!0,spacing:3,children:[Object(p.jsx)(x.a,{item:!0,xs:12,children:Object(p.jsxs)("div",{className:"titleText",children:["Your game code is ",this.state.gameCode," "]})}),Object(p.jsx)(x.a,{item:!0,xs:12,children:Object(p.jsx)(o.b,{to:{pathname:"/guessNumberGame",token:this.state.indToken},className:"link",onClick:function(t){return e.handleGuessLink(t)},children:Object(p.jsx)(k.a,{variant:"contained",color:"primary",disableElevation:!0,children:Object(p.jsx)(h.a,{variant:"button",children:"Start Guess Bottle No. Game"})})})})]})}):Object(p.jsxs)(c.a.Fragment,{children:[Object(p.jsx)(h.a,{variant:"h6",gutterBottom:!0,children:"Create Game"}),Object(p.jsxs)(x.a,{container:!0,spacing:3,children:[Object(p.jsx)(x.a,{item:!0,xs:12,children:Object(p.jsx)(E.a,{id:"standard-basic",value:this.state.username,onChange:this.handleChange,label:"Username"})}),Object(p.jsx)(x.a,{item:!0,xs:12,children:Object(p.jsx)(k.a,{variant:"contained",color:"primary",onClick:this.handleSubmit,children:"Submit"})})]})]})}}]),a}(c.a.Component),X=Object(j.a)((function(e){var t;return{appBar:{position:"relative"},layout:Object(l.a)({width:"auto",marginLeft:e.spacing(2),marginRight:e.spacing(2)},e.breakpoints.up(600+2*e.spacing(2)),{width:600,marginLeft:"auto",marginRight:"auto"}),paper:(t={marginTop:e.spacing(3),marginBottom:e.spacing(3),padding:e.spacing(2)},Object(l.a)(t,e.breakpoints.up(600+2*e.spacing(3)),{marginTop:e.spacing(6),marginBottom:e.spacing(6),padding:e.spacing(3)}),Object(l.a)(t,"backgroundColor","#C4C3D0"),Object(l.a)(t,"borderRadius",10),t),stepper:{padding:e.spacing(3,0,5)},buttons:{display:"flex",justifyContent:"flex-end"},button:{marginTop:e.spacing(3),marginLeft:e.spacing(1)}}})),Z=function(e){var t=X(),a=Object(n.useState)(""),c=Object(C.a)(a,2),i=c[0],s=c[1];Object(n.useEffect)((function(){e.location.token&&s(e.location.token)}),[]);return Object(p.jsxs)("body",{children:[Object(p.jsx)(O,{}),Object(p.jsx)("main",{className:t.layout,children:Object(p.jsx)(f.a,{className:t.paper,children:Object(p.jsx)(Q,{passToken:function(e){console.log(e),s(e)},token:i})})}),Object(p.jsx)("main",{className:i?t.layout:"hidden",children:Object(p.jsx)(f.a,{className:t.paper,children:Object(p.jsx)(q,{token:i})})})]})},$=new(function(){function e(){Object(S.a)(this,e)}return Object(w.a)(e,[{key:"getGuessState",value:function(e){return B.a.post("/api/getGuessState",{token:e}).then((function(e){return e.data})).catch((function(e){console.log(e)}))}},{key:"guess",value:function(e,t){return B.a.post("/api/guess",{token:e,guess:t}).then((function(e){return e.data})).catch((function(e){console.log(e)}))}},{key:"guessToLobby",value:function(e){return B.a.post("/api/guessToLobby",{token:e}).then((function(e){return e.data})).catch((function(e){console.log(e)}))}}]),e}()),ee=a(174),te=a(173),ae=Object(j.a)((function(e){var t;return{root:{flexGrow:1},layout:Object(l.a)({width:"auto",marginLeft:e.spacing(1),marginRight:e.spacing(1)},e.breakpoints.up(600+2*e.spacing(2)),{width:"auto",maxWidth:"70%",marginLeft:"auto",marginRight:"auto"}),paper:(t={marginTop:e.spacing(3),marginBottom:e.spacing(3),padding:e.spacing(1)},Object(l.a)(t,e.breakpoints.up(600+2*e.spacing(3)),{marginTop:e.spacing(6),marginBottom:e.spacing(6),padding:e.spacing(3)}),Object(l.a)(t,"backgroundColor","#C4C3D0"),Object(l.a)(t,"borderRadius",10),t),log:{paddingTop:"1.5rem",paddingBottom:"1.5rem",paddingLeft:"1rem",paddingRight:"1rem"},logContainer:{marginLeft:"auto",marginRight:"auto",width:"fit-content",paddingLeft:"1rem",paddingRight:"1rem",backgroundColor:"#93CAED",borderRadius:10},control:{padding:e.spacing(2)}}})),ne=function(e){var t=Object(n.useState)(e.players),a=Object(C.a)(t,2),c=a[0],i=a[1],s=ae(),r=Object(n.useState)(e.currPlayer),o=Object(C.a)(r,2),l=o[0],u=o[1],j=Object(n.useState)(e.highest),d=Object(C.a)(j,2),b=d[0],g=d[1],h=Object(n.useState)(e.lowest),m=Object(C.a)(h,2),O=m[0],k=m[1],v=Object(n.useState)(e.currGuess),y=Object(C.a)(v,2),S=y[0],w=y[1],G=Object(n.useState)({}),T=Object(C.a)(G,2),N=T[0],L=T[1],B=Object(n.useState)(e.over),R=Object(C.a)(B,2),E=R[0],D=R[1],Y=Object(n.useState)(!1),q=Object(C.a)(Y,2),K=q[0],z=q[1],Q=Object(n.useState)(!1),X=Object(C.a)(Q,2),Z=X[0],$=X[1],ne=Object(n.useState)({apple:M,grapefruit:U,original:_,peach:F,plum:H,strawberry:A,watermelon:J,lychee:V}),ce=Object(C.a)(ne,2),ie=ce[0];ce[1];return Object(n.useEffect)((function(){i(e.players),L(e.sojuMap),u(e.currPlayer),g(e.highest),k(e.lowest),w(e.currGuess),D(e.over),console.log(c)}),[e.players,e.sojuMap,e.currPlayer,e.highest,e.lowest,e.over]),Object(n.useEffect)((function(){$(!1),z(!1),setTimeout((function(){$(!0),z(!0)}),1e3),w(e.currGuess)}),[e.currGuess]),Object(p.jsxs)("div",{children:[Object(p.jsx)("main",{className:0==c.length?"hidden":s.layout,children:Object(p.jsxs)(f.a,{className:0==c.length?"hidden":s.paper,children:[Object(p.jsx)("div",{class:"paperTitleText",children:"Guess The Soju Bottle No."}),Object(p.jsxs)("div",{class:"mutedText",children:["Lowest Guess: ",O,Object(p.jsx)("br",{})," Highest Guess: ",b]}),Object(p.jsx)(x.a,{container:!0,spacing:2,children:c.map((function(e){return Object(p.jsx)(W.a,{className:"cardContainer",style:l==e?{"background-color":"#b1b1af"}:{"background-color":"#dcdcdc"},raised:l==e,children:Object(p.jsxs)(I.a,{className:"cardContentContainer",children:[Object(p.jsx)("img",{src:ie[N[e]],width:"80",height:"120"}),Object(p.jsx)("div",{style:l==e?{"text-align":"center","font-weight":"770"}:{"text-align":"center","font-weight":"bold"},children:e})]})})}))})]})}),Object(p.jsx)(te.a,{in:Z,timeout:1e3,children:Object(p.jsx)(ee.a,{direction:"up",in:K,timeout:1e3,children:Object(p.jsx)(f.a,{className:S[0]&&!E?s.logContainer:"hidden",elevation:6,children:Object(p.jsxs)(P.a,{fontWeight:"fontWeightBold",m:1,justify:"center",alignItems:"center",className:s.log,children:[S[1]," guessed ",S[0],", ",S[0]==b?" the number is lower":"the number is higher"]})})})})]})},ce=a(175),ie=a(170),se=a(176),re=a(182),oe=a(52),le=Object(j.a)((function(e){return{root:{flexGrow:1},paper:{height:100,width:140},control:{padding:e.spacing(2)}}})),ue=function(e){le();var t=Object(n.useState)(e.token),a=Object(C.a)(t,2),c=a[0],i=a[1],s=Object(n.useState)(e.show),r=Object(C.a)(s,2),o=r[0],l=r[1],u=Object(n.useState)(!1),j=Object(C.a)(u,2),d=j[0],b=j[1],g=Object(n.useState)(e.highest),m=Object(C.a)(g,2),O=m[0],f=m[1],x=Object(n.useState)(e.lowest),k=Object(C.a)(x,2),v=k[0],y=k[1],S=Object(n.useState)(0),w=Object(C.a)(S,2),G=w[0],T=w[1];function N(t){t.preventDefault(),console.log(G),G>=O||G<=v?b(!0):(b(!1),e.setClosed(),T(null),l(!1),$.guess(c,G).then((function(e){})))}return Object(n.useEffect)((function(){i(e.token),l(e.show),f(e.highest),y(e.lowest)}),[e.token,e.highest,e.lowest,e.show]),Object(p.jsxs)(re.a,{open:o,"aria-labelledby":"simple-dialog-title",fullWidth:!0,maxWidth:"xs",style:{color:"#626f87"},children:[Object(p.jsx)(ce.a,{id:"simple-dialog-title",style:{"background-color":"#626f87"},children:Object(p.jsx)("div",{className:"medButtonText",children:"Enter your Guess"})}),Object(p.jsxs)(ie.a,{children:[Object(p.jsx)(se.a,{children:Object(p.jsx)(E.a,{id:d?"standard-error-helper-text":"standard-basic",value:G,onChange:function(e){return T(e.target.value)},label:d?"Error":"Guess",defaultValue:"",helperText:d?"Please pick a number in between the lowest and highest guesses":""})}),Object(p.jsx)(se.a,{children:Object(p.jsxs)(h.a,{variant:"caption",children:["Lowest Guess: ",v,Object(p.jsx)("br",{})," Highest Guess: ",O]})})]}),Object(p.jsx)(oe.a,{style:{"background-color":"#3D3D90","align-self":"center","max-width":"90%","margin-bottom":"0.2rem"},variant:"contained",color:"primary",onClick:function(e){return N(e)},children:Object(p.jsx)("div",{className:"smallButtonText",children:"Submit"})})]})},je=a.p+"static/media/gif1.c0a77e8d.gif",de=Object(j.a)((function(e){return{root:{flexGrow:1},paper:{height:100,width:140},control:{padding:e.spacing(2)}}})),be=function(e){de();var t=Object(r.f)(),a=Object(n.useState)(e.token),c=Object(C.a)(a,2),i=c[0],s=c[1],o=Object(n.useState)(e.show),l=Object(C.a)(o,2),u=l[0],j=l[1],d=Object(n.useState)(e.loser),b=Object(C.a)(d,2),g=b[0],h=b[1],m=Object(n.useState)(e.host),O=Object(C.a)(m,2),f=O[0],x=O[1],k=Object(n.useState)(e.num),v=Object(C.a)(k,2),y=v[0],S=v[1];return Object(n.useEffect)((function(){s(e.token),j(e.show),h(e.loser),x(e.host),S(e.num)}),[e.token,e.loser,e.show,e.host,e.num]),Object(p.jsxs)(re.a,{open:u,"aria-labelledby":"simple-dialog-title",fullWidth:!0,maxWidth:"xs",style:{color:"#626f87"},children:[Object(p.jsx)(ce.a,{id:"simple-dialog-title",style:{"background-color":"#626f87"},children:Object(p.jsx)("div",{className:"medButtonText",children:"Drinking Time!"})}),Object(p.jsx)(ie.a,{children:Object(p.jsx)(se.a,{children:Object(p.jsxs)("div",{className:"dialogText",children:[g," guessed the correct number (",y,") and must drink!"]})})}),Object(p.jsx)("img",{style:{"align-self":"center","margin-bottom":"1rem"},src:je}),Object(p.jsx)(oe.a,{style:f?{"background-color":"#3D3D90","align-self":"center","max-width":"90%","margin-bottom":"0.4rem"}:{display:"none"},variant:"contained",color:"primary",onClick:function(e){$.guessToLobby(i).then(t.push({pathname:"/createGame",token:i}))},children:Object(p.jsx)("div",{className:"smallButtonText",children:"Back To Lobby"})})]})},ge=function(e){var t=Object(r.f)(),a=Object(n.useState)(e.location.token),c=Object(C.a)(a,2),i=c[0],s=(c[1],Object(n.useState)(!1)),o=Object(C.a)(s,2),l=o[0],u=o[1],j=Object(n.useState)(!1),d=Object(C.a)(j,2),b=d[0],g=d[1],h=Object(n.useState)(""),m=Object(C.a)(h,2),f=m[0],x=m[1],k=Object(n.useState)(!1),v=Object(C.a)(k,2),y=v[0],S=v[1],w=Object(n.useState)(""),G=Object(C.a)(w,2),T=(G[0],G[1]),N=Object(n.useState)(100),L=Object(C.a)(N,2),B=L[0],E=L[1],D=Object(n.useState)(0),W=Object(C.a)(D,2),I=W[0],P=W[1],M=Object(n.useState)([0,""]),U=Object(C.a)(M,2),_=U[0],F=U[1],H=Object(n.useState)([]),A=Object(C.a)(H,2),J=A[0],V=A[1],Y=Object(n.useState)({}),q=Object(C.a)(Y,2),K=q[0],z=q[1],Q=Object(n.useState)(""),X=Object(C.a)(Q,2),Z=X[0],ee=X[1];Object(n.useEffect)((function(){i&&T(i.split("_")[1]),R.isHost(i).then((function(e){e?e.isHost&&S(!0):console.log("error pinging api")}))}),[]),function(e,t){var a=Object(n.useRef)();Object(n.useEffect)((function(){a.current=e}),[e]),Object(n.useEffect)((function(){if(null!==t){var e=setInterval((function(){a.current()}),t);return function(){return clearInterval(e)}}}),[t])}((function(){te()}),1e3);var te=function(){$.getGuessState(i).then((function(e){console.log(e),e?(e.currGuess!=_[0]&&F([e.currGuess,Z]),console.log(_),E(e.highestGuess),P(e.lowestGuess),V(e.players),ee(e.currPlayer),z(e.sojuMap),e.yourTurn&&!e.gameOver&&(console.log("hey"),u(!0)),e.gameOver&&(x(e.currPlayer),g(!0)),e.link&&t.push({pathname:"/"+e.link,token:i})):console.log("error pinging api")}))};return Object(p.jsxs)("body",{children:[Object(p.jsx)(O,{}),Object(p.jsx)(ne,{players:J,sojuMap:K,currPlayer:Z,highest:B,lowest:I,currGuess:_,over:b}),Object(p.jsx)(ue,{show:l,token:i,highest:B,lowest:I,setClosed:function(){return u(!1)}}),Object(p.jsx)(be,{show:b,loser:f,num:_[0],host:y,token:i})]})};a(135);function he(){return Object(p.jsx)("div",{className:"App",children:Object(p.jsxs)(r.c,{children:[Object(p.jsx)(r.a,{exact:!0,path:"/",component:y}),Object(p.jsx)(r.a,{exact:!0,path:"/lobby",component:z}),Object(p.jsx)(r.a,{exact:!0,path:"/createGame",component:Z}),Object(p.jsx)(r.a,{exact:!0,path:"/guessNumberGame",component:ge}),Object(p.jsx)(r.a,{path:"*",component:function(){return"404 NOT FOUND"}})]})})}var pe=document.getElementById("root");s.a.render(Object(p.jsx)(o.a,{children:Object(p.jsx)(he,{})}),pe)},41:function(e,t,a){}},[[136,1,2]]]);
//# sourceMappingURL=main.1b3d0f98.chunk.js.map
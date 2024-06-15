const bskExample = {
  message: "Hello World",
  numb: null,
  $template: /*html*/`
    <div>
      <h1>{{message}}</h1>
      <p>{{numb}}</p>
      <span v-if="booly">If the attr is correctly parsed, this will not show. If it does still show then the type is still a string. <br>See here: booly is {{typeof booly}}, and its value is {{booly}}</span>
    </div>`,
}

export { bskExample }
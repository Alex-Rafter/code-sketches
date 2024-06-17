const bskExample = {
  message: "Hello World",
  numb: null,
  addColour: false,
  changeTextColour() {
    console.log('changing colour');
    this.addColour = !this.addColour;
    console.log(this.addColour);
  },
  //
  $template: /*html*/`
    <div class="flex flex-wrap gap-3">
      <h1
      class="
        text-5xl
        font-bold
        uppercase
        text-slate-400/[0.6]
        transition
        duration-700
        ease-in-out
      "
      :class="{'text-sky-900': addColour}"
      >{{message}}</h1>
      <p class="w-full">{{numb}}</p>
      <span v-if="booly">If the attr is correctly parsed, this will not show. If it does still show then the type is still a string. <br>See here: booly is {{typeof booly}}, and its value is {{booly}}</span>
      <button class="
      px-4
      py-2
      font-semibold
      text-sm
      bg-violet-500
      text-white
      rounded-md
      shadow-sm
      hover:scale-90
      ease-in-out
      duration-300
      "
      @click="changeTextColour">Change text colour</button>
    </div>`,
}

export { bskExample }
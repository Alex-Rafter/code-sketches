import { signal } from "@preact/signals";
const count = signal(0);

// Function to increment the count
function incrementCount() {
    count.value++;
    console.log("incrementing count", count.value);
}

export { count, incrementCount };
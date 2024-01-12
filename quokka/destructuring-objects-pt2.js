const hotel = {
    name: "Grand Hotel",
    location: "City Center",
    rooms: [
        {
            number: 101,
            type: "Standard",
            price: 100,
            amenities: ["TV", "Wi-Fi"],
        },
        {
            number: 201,
            type: "Deluxe",
            price: 200,
            amenities: ["TV", "Wi-Fi", "Mini Bar"],
        },
    ],
    facilities: {
        restaurant: true,
        gym: true,
        spa: false,
    },
};


const { facilities: { gym } } = hotel;
const { rooms: [room] } = hotel;
console.log(gym); // true
console.log(room); // [ { number: 101, type: 'Standard', price: 100, amenities: [ 'TV', 'Wi-Fi' ] }, { number: 201, type: 'Deluxe', price: 200, amenities: [ 'TV', 'Wi-Fi', 'Mini Bar' ] } ]

const admins = [
    {
        email: 'gebeta_delivery@gmail.com',
        password: 'superclient',
    }
]

const clients = [
    {
        first_name: 'kebede',
        last_name: 'alemu',
        email: 'kebeAlemu@gmail.com',
        address: 'Addis Ababa',
        password: '23456543222',
        phone_no: '0911234567'
    },
    {
        first_name: 'alemitu',
        last_name: 'gera',
        email: 'alemuitu@gmail.com',
        address: 'Adama',
        password: '765432113',
        phone_no: '0911334567'
    }
]

const drivers = [
    {
        first_name: 'desta',
        last_name: 'ayele',
        email: 'desta@gmail.com',
        car: 'Hundai',
        car_plate: '208596',
        password: '23452228888',
        phone_no: '0911234567'
    },
    {
        first_name: 'tesema',
        last_name: 'lemi',
        email: 'tesema@gmail.com',
        car: 'Toyota',
        car_plate: '208596',
        password: '7652113444',
        phone_no: '0911334567'
    }
]

const orders = [
    {
        restaurant_id: '61137d8875fe813ce40a9ff7',
        client_id: 'kebede alemu',
        totalPrice: 300,
        isAcitive: false,
        items: ['6117cefb7884646f651c1b5f','6119293ef7682e729d347203']
    },
    {
        restaurant_id: '61179ab366c13130d1925fa1',
        client_id: 'alemitu gera',
        totalPrice: 400,
        isAcitive: true,
        items: ['6117cefb7884646f651c1b5f','6119293ef7682e729d347203']
    }
]
module.exports = { admins, clients, orders , drivers}
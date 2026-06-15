/**
 * data.js - Persistent Data Management for Muthu Store
 * Handles localStorage operations and initial data seeding.
 */

const STORAGE_KEYS = {
    PRODUCTS: 'muthu_products',
    ORDERS: 'muthu_orders',
    CATEGORIES: 'muthu_categories',
    VERSION: 'muthu_data_signature_v2'
};

const DEFAULT_PRODUCTS = [

    // Rice அரிசி
    { brand: 'KDR', name: 'KDR Ponni Rice', category: 'Loose Items', subCategory: 'Rice அரிசி', price: 70, stock: 50, image: 'https://imgs.search.brave.com/LwjIwjbjiRSjeXsbzWdY6XCb7dkIfVANkl4Ydi5-aek/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMTAv/NDQ5LzgxOS9zbWFs/bC9iYXNtYXRpLXJp/Y2UtaW4tYm93bC1m/cmVlLXBob3RvLmpw/Zw', icon: '🌾' },
    { brand: 'Red Sun', name: 'Red Sun Ponni Rice', category: 'Loose Items', subCategory: 'Rice அரிசி', price: 65, stock: 50, image: 'https://imgs.search.brave.com/LwjIwjbjiRSjeXsbzWdY6XCb7dkIfVANkl4Ydi5-aek/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMTAv/NDQ5LzgxOS9zbWFs/bC9iYXNtYXRpLXJp/Y2UtaW4tYm93bC1m/cmVlLXBob3RvLmpw/Zw', icon: '🌾' },
    { brand: 'Krishna', name: 'Krishna Ponni rice', category: 'Loose Items', subCategory: 'Rice அரிசி', price: 55, stock: 50, image: 'https://imgs.search.brave.com/LwjIwjbjiRSjeXsbzWdY6XCb7dkIfVANkl4Ydi5-aek/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMTAv/NDQ5LzgxOS9zbWFs/bC9iYXNtYXRpLXJp/Y2UtaW4tYm93bC1m/cmVlLXBob3RvLmpw/Zw', icon: '🌾' },
    { brand: 'Unity', name: 'Unity Biryani Rice', category: 'Loose Items', subCategory: 'Rice அரிசி', price: 60, stock: 50, image: 'https://imgs.search.brave.com/LwjIwjbjiRSjeXsbzWdY6XCb7dkIfVANkl4Ydi5-aek/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMTAv/NDQ5LzgxOS9zbWFs/bC9iYXNtYXRpLXJp/Y2UtaW4tYm93bC1m/cmVlLXBob3RvLmpw/Zw', icon: '🌾' },
    { brand: 'taj mahal', name: 'பச்சரிசி  Pacharisi', category: 'Loose Items', subCategory: 'Rice அரிசி', price: 40, stock: 50, image: 'https://imgs.search.brave.com/iFdPbVwwCK3dwS5wV-jmwNqwYwFRPcDsf97hvW17dt0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTg1/Mjg4MDUwL3Bob3Rv/L3doaXRlLXJpY2Uu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PWUxaHNjUzNBZ1Q0/YkE4X2RUdWJhbWVK/dEc3WTZWT1M3TGt4/R1ZGNEFkaXM9', icon: '🌾' },
    { brand: 'MDS', name: 'பச்சரிசி  Pacharisi', category: 'Loose Items', subCategory: 'Rice அரிசி', price: 70, stock: 50, image: 'https://imgs.search.brave.com/iFdPbVwwCK3dwS5wV-jmwNqwYwFRPcDsf97hvW17dt0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTg1/Mjg4MDUwL3Bob3Rv/L3doaXRlLXJpY2Uu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PWUxaHNjUzNBZ1Q0/YkE4X2RUdWJhbWVK/dEc3WTZWT1M3TGt4/R1ZGNEFkaXM9', icon: '🌾' },
    { brand: 'MDS', name: 'சீரகச் சம்பா Seeragam Samba', category: 'Loose Items', subCategory: 'Rice அரிசி', price: 80, stock: 50, image: 'https://imgs.search.brave.com/iFdPbVwwCK3dwS5wV-jmwNqwYwFRPcDsf97hvW17dt0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTg1/Mjg4MDUwL3Bob3Rv/L3doaXRlLXJpY2Uu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PWUxaHNjUzNBZ1Q0/YkE4X2RUdWJhbWVK/dEc3WTZWT1M3TGt4/R1ZGNEFkaXM9', icon: '🌾' },

    // Dals பருப்பு
    { brand: 'MDS', name: 'துவரம் பருப்பு', category: 'Loose Items', subCategory: 'Dals பருப்பு', price: 135, stock: 40, image: 'https://imgs.search.brave.com/vjVCdL11DYWguQYmq5JD3kiiALCoYLBzupSpPLAZau8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi90b29y/LWRhbC15ZWxsb3ct/c3BsaXQtcGVhcy11/c2VkLXRvLW1ha2Ut/c291cC1wZWFzZS1w/dWRkaW5nLTE0MjY5/MDAwOS5qcGc', icon: '🥣' },
    { brand: 'MDS', name: 'உளுந்து பருப்பு', category: 'Loose Items', subCategory: 'Dals பருப்பு', price: 120, stock: 40, image: 'https://imgs.search.brave.com/BJkH87lfZXIqdTVa_z0nryxk--glMAmWHXkaJeyk6ng/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzE2LzkyLzc5LzU4/LzM2MF9GXzE2OTI3/OTU4NzJfd0hXS2JM/OEszNFlMMkFwd3Vl/YlN4Wk54OUxnUEJN/T3AuanBn', icon: '🥣' },
    { brand: 'MDS', name: 'கடலை பருப்பு', category: 'Loose Items', subCategory: 'Dals பருப்பு', price: 90, stock: 40, image: 'https://imgs.search.brave.com/jLV-QwKBjuLWJy0iwE5w7-4ObcKiNszn7PcMxu3Vdq8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9vb29m/YXJtcy5jb20vY2Ru/L3Nob3AvcHJvZHVj/dHMvT09PX0Zhcm1z/X0Jyb3duX0NoYW5h/X0RhbF9pbl9hX0Jv/d2wuanBnP3Y9MTcy/NDI5ODA1NiZ3aWR0/aD0zODQw', icon: '🥣' },
    { brand: 'MDS', name: 'பாசி பருப்பு', category: 'Loose Items', subCategory: 'Dals பருப்பு', price: 116, stock: 40, image: 'https://imgs.search.brave.com/MuvOvV20zmLcJ70cAlqhE1piTGBpyUC-dHCjZv6_Lk4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/Y2xldnVwLmluLzI3/MTgyOS8xNjcyMDI2/NzA4ODkzX1NLVS0w/NDU4XzAuanBlZz93/aWR0aD02MDAmZm9y/bWF0PXdlYnA', icon: '🥣' },
    { brand: 'MDS', name: 'பட்டாணி பருப்பு', category: 'Loose Items', subCategory: 'Dals பருப்பு', price: 100, stock: 40, image: 'https://imgs.search.brave.com/hZS3Q3nD3_VhWFyxnpCQT_8TNDCbrdVKVzdJBp2yOB0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly81Lmlt/aW1nLmNvbS9kYXRh/NS9FQ09NL0RlZmF1/bHQvMjAyNS8yLzQ5/MTg1ODA1MS9RWS9C/SS9UVy8xNDEwOTQ1/NjAvZHJpZWQteWVs/bG93LXNwbGl0LXBl/YXMtaW4tc29tZW9u/ZXMtaGFuZC0xMDAw/eDEwMDAuanBn', icon: '🥣' },

    // Dry Chilli காய்ந்த மிளகாய் 
    { brand: 'MDS', name: 'புது மிளகாய் 1', category: 'Loose Items', subCategory: 'Dry Chilli காய்ந்த மிளகாய்', price: 390, stock: 40, image: 'https://imgs.search.brave.com/Jm3JwPj1SppIm7T4BzgADjTVTzqVFoF65NmBrmeExnY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZG10cmFkZXJzLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/MS8wNi9ndW5kdV9t/aWxhZ2FpLTEtNjAw/eDYwMC5qcGc', icon: '🥣' },
    { brand: 'MDS', name: 'புது மிளகாய் 2', category: 'Loose Items', subCategory: 'Dry Chilli காய்ந்த மிளகாய்', price: 200, stock: 40, image: 'https://imgs.search.brave.com/Jm3JwPj1SppIm7T4BzgADjTVTzqVFoF65NmBrmeExnY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZG10cmFkZXJzLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/MS8wNi9ndW5kdV9t/aWxhZ2FpLTEtNjAw/eDYwMC5qcGc', icon: '🥣' },
    { brand: 'MDS', name: 'பழைய மிளகாய்', category: 'Loose Items', subCategory: 'Dry Chilli காய்ந்த மிளகாய்', price: 160, stock: 40, image: 'https://imgs.search.brave.com/DnmiNY83Xa5NDHj0xhyPKi2Kpg2Eq-GtKJ9uWVEKIHY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ncmFt/aXl1bS5pbi93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMi8wOS9i/dXktcm91bmQtZHJ5/LWNoaWxsaS1vbmxp/bmUuZ2lm.gif', icon: '🥣' },
    { brand: 'MDS', name: 'நீட்டு மிளகாய்', category: 'Loose Items', subCategory: 'Dry Chilli காய்ந்த மிளகாய்', price: 300, stock: 40, image: 'https://imgs.search.brave.com/3tKj6dS2mvPPIjaPw84s2WbCFrFpdyvcJC_TK0RZu3c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdWRo/YW50aXJhLmNvbS9j/ZG4vc2hvcC9wcm9k/dWN0cy9kcnktY2hp/bGxpLTI1MDk2Ni5q/cGc_dj0xNzU4NjA2/NTY3JndpZHRoPTM4/NDA', icon: '🥣' },

    // Tamarind புளி
    { brand: 'MDS', name: 'Tamarind புது புளி', category: 'Loose Items', subCategory: 'Tamarind புளி', price: 160, stock: 40, image: 'https://imgs.search.brave.com/pBUadMpgVngxcrNAU-HvzYgA68oh8w91uv33sMlTBSo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L3ByZW1pdW0tcGhv/dG8vdGFtYXJpbmQt/ZnJ1aXRzLXdpdGgt/Z3JlZW4tbGVhdmVz/LWlzb2xhdGVkLXdo/aXRlLWJhY2tncm91/bmRfMTg0NDIxLTIx/Ni5qcGc_c2VtdD1h/aXNfaHlicmlkJnc9/NzQwJnE9ODA', icon: '🥣' },
    { brand: 'MDS', name: 'Tamarind பழைய புளி', category: 'Loose Items', subCategory: 'Tamarind புளி', price: 300, stock: 40, image: 'https://imgs.search.brave.com/pBUadMpgVngxcrNAU-HvzYgA68oh8w91uv33sMlTBSo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L3ByZW1pdW0tcGhv/dG8vdGFtYXJpbmQt/ZnJ1aXRzLXdpdGgt/Z3JlZW4tbGVhdmVz/LWlzb2xhdGVkLXdo/aXRlLWJhY2tncm91/bmRfMTg0NDIxLTIx/Ni5qcGc_c2VtdD1h/aXNfaHlicmlkJnc9/NzQwJnE9ODA', icon: '🥣' },
    { brand: 'MDS', name: 'Tamarind தோசை புளி', category: 'Loose Items', subCategory: 'Tamarind புளி', price: 300, stock: 40, image: 'https://imgs.search.brave.com/pBUadMpgVngxcrNAU-HvzYgA68oh8w91uv33sMlTBSo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L3ByZW1pdW0tcGhv/dG8vdGFtYXJpbmQt/ZnJ1aXRzLXdpdGgt/Z3JlZW4tbGVhdmVz/LWlzb2xhdGVkLXdo/aXRlLWJhY2tncm91/bmRfMTg0NDIxLTIx/Ni5qcGc_c2VtdD1h/aXNfaHlicmlkJnc9/NzQwJnE9ODA', icon: '🥣' },

    // Garlic பூண்டு
    { brand: 'MDS', name: 'Small Garlic சிறிய பூண்டு', category: 'Loose Items', subCategory: 'Garlic பூண்டு', price: 260, stock: 40, image: 'https://imgs.search.brave.com/pFIUHOLnXCApSBTc37nFreY20y8RIDOXnF8U1kYCLso/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L3ByZW1pdW0tcGhv/dG8vZ2FybGljLWlz/b2xhdGVkLXdoaXRl/LWJhY2tncm91bmRf/MjUzOTg0LTQ4MjAu/anBnP2dhPUdBMS4x/LjE2MDY1MzI0MDQu/MTc4MDg0OTk5NCZz/ZW10PWFpc19oeWJy/aWQmdz03NDAmcT04/MA', icon: '🥣' },
    { brand: 'MDS', name: 'Big Garlic பெரிய பூண்டு', category: 'Loose Items', subCategory: 'Garlic பூண்டு', price: 220, stock: 40, image: 'https://imgs.search.brave.com/pFIUHOLnXCApSBTc37nFreY20y8RIDOXnF8U1kYCLso/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L3ByZW1pdW0tcGhv/dG8vZ2FybGljLWlz/b2xhdGVkLXdoaXRl/LWJhY2tncm91bmRf/MjUzOTg0LTQ4MjAu/anBnP2dhPUdBMS4x/LjE2MDY1MzI0MDQu/MTc4MDg0OTk5NCZz/ZW10PWFpc19oeWJy/aWQmdz03NDAmcT04/MA', icon: '🥣' },

    // Flour மாவு 
    { brand: 'Tiger Maida', name: 'Tiger Maida', category: 'Loose Items', subCategory: 'Flour மாவு', price: 105, stock: 50, image: 'https://imgs.search.brave.com/MtVNz3N4xgL9VaNR4YQdg1SBvprnWQojy5oZTDTRAqQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/a2V4cG9ydGVyLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/Mi8wOC9NQUlEQS5q/cGc', icon: '🌾' },
    { brand: 'Century Maida', name: 'Century Maida', category: 'Loose Items', subCategory: 'Flour மாவு', price: 220, stock: 50, image: 'https://imgs.search.brave.com/MtVNz3N4xgL9VaNR4YQdg1SBvprnWQojy5oZTDTRAqQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/a2V4cG9ydGVyLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/Mi8wOC9NQUlEQS5q/cGc', icon: '🌾' },
    { brand: 'Charminar', name: 'Wheat Flour கோதுமை மாவு', category: 'Loose Items', subCategory: 'Flour மாவு', price: 120, stock: 40, image: 'https://imgs.search.brave.com/0mzMZs8p3Bns7QbT4ANwVFbZ-RNo24Tbvd4oImiTS9c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjkw/MTM0MDc2L3Bob3Rv/L3dob2xlLWdyYWlu/LXdoZWF0LWZsb3Vy/LWFuZC1lYXJzLWlz/b2xhdGVkLW9uLXdo/aXRlLndlYnA_YT0x/JmI9MSZzPTYxMng2/MTImdz0wJms9MjAm/Yz1BXzd4ODlUSTVt/ZXpFcE1DQ0xzN3d4/ZmdKemh2ZzVOMDNH/YlVJOURYbm5FPQ', icon: '🥣' },
    { brand: 'LEADER', name: 'Gram Flour கடலை மாவு', category: 'Loose Items', subCategory: 'Flour மாவு', price: 220, stock: 50, image: 'https://imgs.search.brave.com/4DJjRltrgK6UDr65fTHXUdrYMh3ip-L2B9PCy_3APN8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aWlt/Zy50aXN0YXRpYy5j/b20vZnAvMi8wMDgv/NDAyL2dsdXRlbi1m/cmVlLXByZW1pdW0t/cXVhbGl0eS1hbmQt/aGVhbHRoeS1wcm90/ZWluLWdyYW0tZmxv/dXItNDk0LmpwZw', icon: '🌾' },

    // Chickpeas மூக்கடலை
    { brand: 'MDS', name: 'Chickpeas சிறிய கருப்பு மூக்கடலை', category: 'Loose Items', subCategory: 'Chickpeas மூக்கடலை', price: 105, stock: 50, image: 'https://imgs.search.brave.com/ZnKNOgOUVOnCGxlHoA_TY-40wCmTNbUYoVDMQGyO9Og/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFyWkVveXFCUEwu/anBn', icon: '🌾' },
    { brand: 'MDS', name: 'Chickpeas பெரிய கருப்பு மூக்கடலை', category: 'Loose Items', subCategory: 'Chickpeas மூக்கடலை', price: 220, stock: 50, image: 'https://imgs.search.brave.com/ZnKNOgOUVOnCGxlHoA_TY-40wCmTNbUYoVDMQGyO9Og/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFyWkVveXFCUEwu/anBn', icon: '🌾' },
    { brand: 'MDS', name: 'Chickpeas சிறிய வெள்ளை மூக்கடலை', category: 'Loose Items', subCategory: 'Chickpeas மூக்கடலை', price: 120, stock: 40, image: 'https://imgs.search.brave.com/hmul51YQsb0AdLr-N5s7AlSEUPb6NuqvJdcdWfgYwEE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMx/MjY1NjYwMC9waG90/by9kcnktY2hpY2tw/ZWFzLWluLWEtd29v/ZGVuLXBsYXRlLW9u/LWEtd2hpdGUtYmFj/a2dyb3VuZC1pc29s/YXRlZC10aGUtdmll/dy1mcm9tLXRvcC5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/enVLQ0VvdzJ3Umpm/akxxaGhteGlMOENz/aXFRRHk3RUkwaER3/N2xZWkR5cz0', icon: '🥣' },
    { brand: 'MDS', name: 'Chickpeas பெரிய வெள்ளை மூக்கடலை', category: 'Loose Items', subCategory: 'Chickpeas மூக்கடலை', price: 220, stock: 50, image: 'https://imgs.search.brave.com/hmul51YQsb0AdLr-N5s7AlSEUPb6NuqvJdcdWfgYwEE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMx/MjY1NjYwMC9waG90/by9kcnktY2hpY2tw/ZWFzLWluLWEtd29v/ZGVuLXBsYXRlLW9u/LWEtd2hpdGUtYmFj/a2dyb3VuZC1pc29s/YXRlZC10aGUtdmll/dy1mcm9tLXRvcC5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/enVLQ0VvdzJ3Umpm/akxxaGhteGlMOENz/aXFRRHk3RUkwaER3/N2xZWkR5cz0', icon: '🌾' },
    { brand: 'MDS', name: 'உடைத்த கடலை', category: 'Loose Items', subCategory: 'Chickpeas மூக்கடலை', price: 130, stock: 40, image: 'https://imgs.search.brave.com/PxDpRrAKgCkll4aZeyN_DV__2eN0dRViO48Kh8eUGLs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly92aXZh/c2F5ZS5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjEvMDgv/ZnJpZWQtZ3JhbS01/MDB4NTAwLTEuanBn', icon: '🥣' },

    // Oil
    { brand: 'Gold Winner', name: 'Gold Winner Sunflower oil (500ml)', category: 'Oil', price: 89, stock: 30, image: 'https://imgs.search.brave.com/-RDfXHEb56GgcF7L5ttFz5nsZnHjl885HEWlJA_TLE4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/emVwdG9ub3cuY29t/L3Byb2R1Y3Rpb24v/aWstc2VvL3RyOnct/NDcwLGFyLTEyMDAt/MTIwMCxwci10cnVl/LGYtYXV0bywscS00/MCxkcHItMi9jbXMv/cHJvZHVjdF92YXJp/YW50L2M2YzEzNmY0/LWQyMTMtNGQ0ZC04/MmY4LWY2YTZhNzEy/MGU1MC9Hb2xkLVdp/bm5lci1SZWZpbmVk/LVN1bmZsb3dlci1P/aWwtUG91Y2guanBl/Zw', icon: '🍾' },
    { brand: 'Gold Winner', name: 'Gold Winner Sunflower oil (1L)', category: 'Oil', price: 175, stock: 30, image: 'https://imgs.search.brave.com/epZzzIojivGolwKJ1lLIyd4ADNIiwAEKglXDgzXgrY8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jY2Nh/cGkuY29jb2NhLmlu/L3B1YmxpYy91cGxv/YWRzL3Byb2R1Y3Rf/aW1hZ2VzL3Byb2R1/Y3RfaW1hZ2VfMTIw/MHgxMjAwL3Rlc3Qt/MTIwMHgxMjAwJTIw/R29sZCUyMFdpbm5l/ciUyMDElMjBsLmpw/Zw', icon: '🥣' },
    { brand: 'Gold Winner', name: 'Gold Winner Sunflower oil (5L)', category: 'Oil', price: 890, stock: 30, image: 'https://imgs.search.brave.com/s9Xk-ENqP2k_siKRpE4tYvwBI9jzzfe4IzP5oA6FnRo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly81Lmlt/aW1nLmNvbS9kYXRh/NS9TRUxMRVIvRGVm/YXVsdC8yMDIzLzIv/WFEvUFovT1cvMTgy/NTkzMDQ3L2dvbGQt/dmlubmVyLW9pbC0x/MDAweDEwMDAuanBn', icon: '🥣' },
    { brand: 'SVS', name: 'SVS sunflower oil (500ml)', category: 'Oil', price: 185, stock: 30, image: 'https://images.unsplash.com/photo-1620706122141-8600192767e1?auto=format&fit=crop&q=80&w=400', icon: '🍾' },
    { brand: 'SVS', name: 'SVS sunflower oil (1L)', category: 'Oil', price: 210, stock: 30, image: 'https://imgs.search.brave.com/tdU7_ONONQZ_fa6QVHK0fPda1G_UHSK46BpA-CaQHMw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDFPVUMyM1JzSUwu/anBn', icon: '🍾' },
    { brand: 'SVS', name: 'SVS sunflower oil (5L)', category: 'Oil', price: 880, stock: 30, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400', icon: '🍾' },
    { brand: 'SVS', name: 'SVS Vite Refined Groundnut Oil (1L)', category: 'Oil', price: 180, stock: 30, image: 'https://svsoil.com/cdn/shop/files/1.SVSVite1L-FrontFullPack.png?v=1753262481&width=840', icon: '🍾' },

    // Flour 
    { brand: 'Aashirvaad', name: 'Aashirvaad Atta (500g)', category: 'Flour', price: 45, stock: 200, image: 'https://imgs.search.brave.com/Of99sLZ31SnFF2sjNnObYPNhSl11DVkEpNjJz7hsHz8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFaN3pxcjZyQUwu/anBn', icon: '🌾' },
    { brand: 'Aashirvaad', name: 'Aashirvaad Atta (1kg)', category: 'Flour', price: 60, stock: 150, image: 'https://imgs.search.brave.com/dHCGO2MgSjNWeJ8x-AfPDCXrbf2zdchzTMrPK719zt4/rs:fit:860:0:0:0/g:ce/aHR0cDovL3d3dy5m/YW1pbHlnYXJkZW4u/aW4vaW1hZ2UvY2Fj/aGUvY2F0YWxvZy9H/cm9jZXJ5L21wLWF0/dGEtMTAwMHgxMDAw/LnBuZw', icon: '🌾' },
    { brand: 'Aashirvaad', name: 'Aashirvaad Atta (2kg)', category: 'Flour', price: 105, stock: 50, image: 'https://imgwlns.gumlet.io/images/products/270089-1.jpg', icon: '🌾' },
    { brand: 'Aashirvaad', name: 'Aashirvaad Atta (5kg)', category: 'Flour', price: 250, stock: 50, image: 'https://imgwlns.gumlet.io/images/products/270089-1.jpg', icon: '🌾' },
    { brand: 'Fortune', name: 'Fortune Atta 1+1 (1kg)', category: 'Flour', price: 220, stock: 50, image: 'https://imgs.search.brave.com/tnKUzZ-BiqLnRBwGM25H-k_fnykNYD9X6UI2OzY0o_g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zZXJ2/aWNlcy5rcG5mcmVz/aC5jb20vbWVkaWEv/djEvcHJvZHVjdHMv/aW1hZ2VzLzFlYzMy/NmRjLTcwNjMtNDU0/MC1iY2M0LWRlZWUw/OGJjYTBlYi9mb3J0/dW5lLWNoYWtraS1m/cmVzaC1hdHRhLndl/YnA_Y190eXBlPUMx', icon: '🌾' },
    { brand: 'Charminar', name: 'Charminar Atta (5kg)', category: 'Flour', price: 220, stock: 50, image: 'https://gingimart.com/wp-content/uploads/2026/05/char.webp', icon: '🌾' },
    { brand: 'Charminar', name: 'Charminar Atta (10kg)', category: 'Flour', price: 220, stock: 50, image: 'https://gingimart.com/wp-content/uploads/2026/05/char.webp', icon: '🌾' },
    { brand: 'Naga', name: 'Naga Maida (500g)', category: 'Flour', price: 45, stock: 200, image: 'https://imgs.search.brave.com/M9PM3csBOJcRugJlyoWnvsz44hQy1H8rcJgTYged6S4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/emVwdG9ub3cuY29t/L3Byb2R1Y3Rpb24v/aWstc2VvL3RyOnct/NDcwLGFyLTEyMDAt/MTIwMCxwci10cnVl/LGYtYXV0byxxLTQw/LGRwci0yL2Ntcy9w/cm9kdWN0X3Zhcmlh/bnQvODdkMWEzMjQt/N2E2Zi00Nzc0LWJm/NjUtZTc4MDc1MjU4/MDliL05hZ2EtTWFp/ZGEuanBlZw', icon: '🌾' },
    { brand: 'Naga', name: 'Naga Maida (1kg)', category: 'Flour', price: 60, stock: 150, image: 'https://imgs.search.brave.com/ujyy2lE8r-TnIpAZ4Lrb4453_UxPKbNwXW0DppShJ3I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/emVwdG9ub3cuY29t/L3Byb2R1Y3Rpb24v/aWstc2VvL3RyOnct/NDcwLGFyLTEyMDAt/MTIwMCxwci10cnVl/LGYtYXV0byxxLTQw/LGRwci0yL2Ntcy9w/cm9kdWN0X3Zhcmlh/bnQvNDQxOGFjNjEt/NWY2YS00OTRhLTg0/ZWQtZWE2ZWJhZDY3/ODk4L05hZ2EtTWFp/ZGEuanBn', icon: '🌾' },

    // Salt
    { brand: 'Tata', name: 'Tata Iodized Salt (1kg)', category: 'Salt', price: 28, stock: 150, image: 'https://imgs.search.brave.com/0vM3ft11DY1ftfjdHLV_vfXQG8rvsw3kf1Mmh-Jb1lw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aWlt/Zy50aXN0YXRpYy5j/b20vZnAvMS8wMDcv/NzM5L2hlYWx0aHkt/cHVyZS1wcm9wZXIt/YW1vdW50LW9mLWlv/ZGluZS1jb29raW5n/LXdoaXRlLXRhdGEt/c2FsdC00OTcuanBn', icon: '🧂' },
    { brand: 'Tata', name: 'Tata Crystal Salt (1kg)', category: 'Salt', price: 15, stock: 200, image: 'https://imgs.search.brave.com/lOlS4S6aoHqIKUy0UHRzQU6u6ozMkbTH9iR_sWWtGp4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDE3Y0lXRUVZUUwu/anBn', icon: '🧂' },

    // Sugar & Sweeteners
    { brand: 'MDS', name: 'Sugar', category: 'Sugar & Sweeteners', price: 45, stock: 200, image: 'https://imgs.search.brave.com/Wom9vevx-QF0QV6KPFQix4UUjZWw-yt6L7UTWUee1EA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9yZWZp/bmVkLXN1Z2FyLWNl/cmFtaWMtYm93bC1p/bWFnZS1jdXQtb3V0/LWlzb2xhdGVkLXdo/aXRlLWJhY2tncm91/bmQtY2xpcHBpbmct/cGF0aC02NzI4NzUy/Ny5qcGc', icon: '🍯' },
    { brand: 'MDS', name: 'Refined Sugar (1kg)', category: 'Sugar & Sweeteners', price: 45, stock: 200, image: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&q=80&w=400', icon: '🍯' },
    { brand: 'MDS', name: 'Organic Jaggery', category: 'Sugar & Sweeteners', price: 60, stock: 150, image: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&q=80&w=400', icon: '🍯' },
    { brand: 'Patandjali', name: 'Pure Honey (250g)', category: 'Sugar & Sweeteners', price: 150, stock: 50, image: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&q=80&w=400', icon: '🍯' },

    // Semiya
    { brand: 'Anil', name: 'Anil Vermicelli (Semiya)', category: 'Semiya', price: 18, stock: 80, image: 'https://imgs.search.brave.com/fCklThjDM_4nhSY2dV_jBtPrP99o_U_xk_dPAxw4Qyg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9vZGhp/LmluL2ltYWdlL2Nh/Y2hlL2NhdGFsb2cv/Z3JvY2VyeS9ub29k/bGVzLXZlcm1pY2Vs/bGkvYW5pbC1yb2Fz/dGVkLXNob3J0LXZl/cm1pY2VsbGktMTgw/Zy1mcm9udC1zYWxl/LW9ubGluZS1jb2lt/YmF0b3JlLTYwMHg2/MDAuanBn', icon: '🍜' },
    { brand: 'Suvai', name: 'Suvai Ragi (Semiya)', category: 'Semiya', price: 20, stock: 80, image: 'https://img.clevup.in/36037/1622800710665_SKU-0603_0.jpg?width=600&format=webp', icon: '🍜' },
    { brand: 'Suvai', name: 'Suvai Vermicelli 180 (Semiya)', category: 'Semiya', price: 18, stock: 80, image: 'https://img.clevup.in/36037/1622800653357_SKU-0602_0.jpg?width=600&format=webp', icon: '🍜' },
    { brand: 'Suvai', name: 'Suvai Vermicelli 400 (Semiya)', category: 'Semiya', price: 40, stock: 80, image: 'https://img.clevup.in/36037/1622800653357_SKU-0602_0.jpg?width=600&format=webp', icon: '🍜' },

    // Pasta
    { brand: 'MDS', name: 'Masala Pasta', category: 'Pasta', price: 45, stock: 60, image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=400', icon: '🍝' },

    // Noodles
    { brand: 'Maggi', name: 'Maggi Noodles (pk)', category: 'Noodles', price: 15, stock: 200, image: 'https://imgs.search.brave.com/JbA2T85U_4hclnvciVB4lYjAYu9-fTyqyKtLd-yPKTg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFsWHR1NVo4RUwu/anBn', icon: '🍜' },
    { brand: 'Maggi', name: 'Maggi Noodles Family Pack (pk)', category: 'Noodles', price: 55, stock: 200, image: 'https://imgs.search.brave.com/zmYPUDwrjQsGNc-wo3KuFB7UCgYIG-Zldr1kW44A3f0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFnNmRzdHhaTkwu/anBn', icon: '🍜' },
    { brand: 'Yippee', name: 'Yippee Noodles (pk)', category: 'Noodles', price: 15, stock: 200, image: 'https://imgs.search.brave.com/c8fQ69Js6PasceMSwEtJT5tUd6pyJ8S_4sCCoTrX9Rs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/ODFubHRHYjlySkwu/anBn', icon: '🍜' },
    { brand: 'Yippee', name: 'Yippee Noodles Family pack (pk)', category: 'Noodles', price: 55, stock: 200, image: 'https://imgs.search.brave.com/sJ94yiwrIHx0aRt9gzpQOMlWdJwIK6cJ_8zhndyF1TA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly81Lmlt/aW1nLmNvbS9kYXRh/NS9BTkRST0lEL0Rl/ZmF1bHQvMjAyMy8x/L1VUL0NKL0FQLzE1/Mzk4NDM3NS9wcm9k/dWN0LWpwZWctMTAw/MHgxMDAwLmpwZw', icon: '🍜' },


    // Tea Powder
    { brand: '3 Roses', name: 'Red Label Tea (500g)', category: 'Tea Powder', price: 250, stock: 50, image: 'https://images.unsplash.com/photo-1594631252845-29fc458695d7?auto=format&fit=crop&q=80&w=400', icon: '🍵' },
    { brand: 'TATA TEA', name: 'Chakra Gold (50g)', category: 'Tea Powder', price: 35, stock: 50, image: 'https://images.unsplash.com/photo-1594631252845-29fc458695d7?auto=format&fit=crop&q=80&w=400', icon: '🍵' },
    { brand: 'TATA TEA', name: 'Chakra Gold (100g)', category: 'Tea Powder', price: 70, stock: 50, image: 'https://images.unsplash.com/photo-1594631252845-29fc458695d7?auto=format&fit=crop&q=80&w=400', icon: '🍵' },
    { brand: 'TATA TEA', name: 'Chakra Gold (250g)', category: 'Tea Powder', price: 145, stock: 50, image: 'https://images.unsplash.com/photo-1594631252845-29fc458695d7?auto=format&fit=crop&q=80&w=400', icon: '🍵' },

    // Coffee Powder
    { brand: 'Bru', name: 'Instant Coffee (100g)', category: 'Coffee Powder', price: 180, stock: 50, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400', icon: '☕' },
    { brand: 'Nescafe', name: 'Classic Coffee (100g)', category: 'Coffee Powder', price: 320, stock: 50, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400', icon: '☕' },

    // Masala
    { brand: 'MDS', name: 'Turmeric Powder', category: 'Masala', price: 35, stock: 100, image: 'https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=80&w=400', icon: '🌶️' },
    { brand: 'MDS', name: 'Red Chilli Powder', category: 'Masala', price: 45, stock: 100, image: 'https://images.unsplash.com/photo-1599481238505-b8b0537a3f77?auto=format&fit=crop&q=80&w=400', icon: '🌶️' },
    { brand: 'MDS', name: 'Coriander Powder', category: 'Masala', price: 30, stock: 100, image: 'https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=80&w=400', icon: '🌶️' },
    { brand: 'MDS', name: 'Garam Masala', category: 'Masala', price: 50, stock: 100, image: 'https://images.unsplash.com/photo-1599481238505-b8b0537a3f77?auto=format&fit=crop&q=80&w=400', icon: '🌶️' },

    // Spices
    { brand: 'MDS', name: 'Whole Black Pepper', category: 'Spices', price: 80, stock: 50, image: 'https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=80&w=400', icon: '🌿' },
    { brand: 'MDS', name: 'Cardamom (Elaichi)', category: 'Spices', price: 150, stock: 30, image: 'https://images.unsplash.com/photo-1599481238505-b8b0537a3f77?auto=format&fit=crop&q=80&w=400', icon: '🌿' },
    { brand: 'MDS', name: 'Cloves (Laung)', category: 'Spices', price: 90, stock: 40, image: 'https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=80&w=400', icon: '🌿' },
    { brand: 'MDS', name: 'Cumin Seeds', category: 'Spices', price: 60, stock: 100, image: 'https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=80&w=400', icon: '🌿' },
    { brand: 'MDS', name: 'Mustard Seeds', category: 'Spices', price: 40, stock: 100, image: 'https://images.unsplash.com/photo-1599481238505-b8b0537a3f77?auto=format&fit=crop&q=80&w=400', icon: '🌿' },

    // Pickles
    { brand: 'Priya', name: 'Mango Pickle', category: 'Pickles', price: 80, stock: 40, image: 'https://images.unsplash.com/photo-1544333323-c242b442436d?auto=format&fit=crop&q=80&w=400', icon: '🥒' },
    { brand: 'Priya', name: 'Lemon Pickle', category: 'Pickles', price: 75, stock: 40, image: 'https://images.unsplash.com/photo-1544333323-c242b442436d?auto=format&fit=crop&q=80&w=400', icon: '🥒' },
    { brand: 'Mothers Recipe', name: 'Mixed Pickle', category: 'Pickles', price: 85, stock: 40, image: 'https://images.unsplash.com/photo-1544333323-c242b442436d?auto=format&fit=crop&q=80&w=400', icon: '🥒' },

    // Sauces
    { brand: 'Maggi', name: 'Tomato Ketchup', category: 'Sauces', price: 120, stock: 50, image: 'https://images.unsplash.com/photo-1585238341267-1cfec2046a55?auto=format&fit=crop&q=80&w=400', icon: '🥫' },
    { brand: 'MDS', name: 'Soy Sauce', category: 'Sauces', price: 90, stock: 30, image: 'https://images.unsplash.com/photo-1585238341267-1cfec2046a55?auto=format&fit=crop&q=80&w=400', icon: '🥫' },

    // Biscuits
    { brand: 'Oreo', name: 'Chocolate Biscuits', category: 'Biscuits', price: 40, stock: 100, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400', icon: '🍪' },

    // Packaged Food
    { brand: 'Lay\'s', name: 'Classic Salted Chips', category: 'Packaged Food', price: 20, stock: 100, image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&q=80&w=400', icon: '🍱' },

    // Ghee
    { brand: 'Amul', name: 'Pure Cow Ghee (500ml)', category: 'Ghee', price: 320, stock: 20, image: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&q=80&w=400', icon: '🧈' },

    // Nuts
    { brand: 'Happilo', name: 'Premium Cashews (200g)', category: 'Nuts', price: 280, stock: 40, image: 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&q=80&w=400', icon: '🥜' },

    // Household
    { brand: 'Head & Shoulders', name: 'Anti-Dandruff Shampoo', category: 'Household', price: 180, stock: 40, image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=400', icon: '🧴' },
    { brand: 'Surf Excel', name: 'Detergent Powder (1kg)', category: 'Household', price: 156, stock: 50, image: 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&q=80&w=400', icon: '🧺' },
    { brand: 'Comfort', name: 'Fabric Liquid Detergent', category: 'Household', price: 120, stock: 40, image: 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&q=80&w=400', icon: '🧴' },
    { brand: 'Rin', name: 'Detergent Soap Bar', category: 'Household', price: 15, stock: 100, image: 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&q=80&w=400', icon: '🧼' },
    { brand: 'Dove', name: 'Beauty Bar Soap', category: 'Household', price: 75, stock: 100, image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&q=80&w=400', icon: '🧼' },
    { brand: 'Vim', name: 'Vim Bar (Dishwash Soap)', category: 'Household', price: 20, stock: 150, image: 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&q=80&w=400', icon: '🧽' },
    { brand: 'Vim', name: 'Dish Wash Liquid (500ml)', category: 'Household', price: 95, stock: 50, image: 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&q=80&w=400', icon: '🧽' },

    // Nutritional Drink
    { brand: 'Horlicks', name: 'Health Drink (500g)', category: 'Nutritional Drink', price: 260, stock: 30, image: 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&q=80&w=400', icon: '🥛' },

    // Shaving Blade
    { brand: 'Gillette', name: 'Presto Bladess (pk)', category: 'Shaving Blade', price: 45, stock: 100, image: 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&q=80&w=400', icon: '🪒' },

    // Grains & Pulses
    { brand: 'Aashirvaad', name: 'Whole Wheat Atta (10kg)', category: 'Grains & Pulses', price: 445, stock: 100, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400', icon: '🌾' },
    { brand: 'Tata Sampann', name: 'Fine Maida (1kg)', category: 'Grains & Pulses', price: 55, stock: 80, image: 'https://images.unsplash.com/photo-1627485750592-9e03b4ebfe6c?auto=format&fit=crop&q=80&w=400', icon: '🌾' },
    { brand: 'Fortune', name: 'Premium Sooji (500g)', category: 'Grains & Pulses', price: 35, stock: 60, image: 'https://images.unsplash.com/photo-1543320485-d0d5a49c2b2e?auto=format&fit=crop&q=80&w=400', icon: '🌾' },
    { brand: 'MDS', name: 'Poha (Flattened Rice)', category: 'Grains & Pulses', price: 50, stock: 70, image: 'https://images.unsplash.com/photo-1589135339644-8097b3992004?auto=format&fit=crop&q=80&w=400', icon: '🌾' },

    // Chocolates
    { brand: 'Cadbury', name: 'Dairy Milk Silk', category: 'Chocolates', price: 80, stock: 60, image: 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&q=80&w=400', icon: '🍫' }
];

const DEFAULT_CATEGORIES = [
    { name: 'Loose Items', icon: '⚖️' },
    { name: 'Rice', icon: '🌾' },
    { name: 'Dals', icon: '🥣' },
    { name: 'Oil', icon: '🍾' },
    { name: 'Salt', icon: '🧂' },
    { name: 'Sugar & Sweeteners', icon: '🍯' },
    { name: 'Flour', icon: '🍚' },
    { name: 'Semiya', icon: '🍜' },
    { name: 'Pasta', icon: '🍝' },
    { name: 'Noodles', icon: '🍜' },
    { name: 'Tea Powder', icon: '🍵' },
    { name: 'Coffee Powder', icon: '☕' },
    { name: 'Masala', icon: '🌶️' },
    { name: 'Spices', icon: '🌿' },
    { name: 'Pickles', icon: '🥒' },
    { name: 'Sauces', icon: '🥫' },
    { name: 'Biscuits', icon: '🍪' },
    { name: 'Packaged Food', icon: '🍱' },
    { name: 'Ghee', icon: '🧈' },
    { name: 'Nuts', icon: '🥜' },
    { name: 'Household', icon: '🧻' },
    { name: 'Nutritional Drink', icon: '🥛' },
    { name: 'Shaving Blade', icon: '🪒' },
    { name: 'Grains & Pulses', icon: '🌾' },
    { name: 'Chocolates', icon: '🍫' }
];
class DataStore {
    constructor() {
        this.init();
    }

    init() {
        // Generate a signature for the current hardcoded data
        const currentSignature = JSON.stringify(DEFAULT_PRODUCTS).length + '_' + JSON.stringify(DEFAULT_CATEGORIES).length;
        const storedSignature = localStorage.getItem(STORAGE_KEYS.VERSION);

        // If the signature has changed (code modified) OR it's the first run, refresh the data
        if (storedSignature !== currentSignature) {
            console.log('Detected data changes in data.js. Refreshing localStorage...');
            const productsWithIds = DEFAULT_PRODUCTS.map((p, idx) => ({
                id: 'PROD-' + (idx + 1) + '-' + Math.random().toString(36).substr(2, 4),
                ...p
            }));
            localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(productsWithIds));
            localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
            localStorage.setItem(STORAGE_KEYS.VERSION, currentSignature);
        }

        // Always ensure orders exists
        if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
            localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([]));
        }
    }

    // Products
    getProducts() {
        const products = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS)) || [];
        let modified = false;
        products.forEach((p, idx) => {
            if (!p.id) {
                p.id = 'PROD-' + (idx + 1) + '-' + Math.random().toString(36).substr(2, 4);
                modified = true;
            }
        });
        if (modified) {
            localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
        }
        return products;
    }

    saveProduct(product, oldId) {
        const products = this.getProducts();
        product.icon = this.getCategoryIcon(product.category);
        if (oldId) {
            const index = products.findIndex(p => p.id === oldId);
            if (index !== -1) {
                product.id = oldId;
                products[index] = product;
            } else {
                if (!product.id) product.id = 'PROD-' + Date.now();
                products.push(product);
            }
        } else {
            product.id = 'PROD-' + Date.now();
            products.push(product);
        }
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
        return product;
    }

    deleteProduct(id) {
        let products = this.getProducts();
        products = products.filter(p => p.id !== id);
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    }

    // Categories
    getCategories() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES)) || [];
    }

    // Orders
    getOrders() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS)) || [];
    }

    saveOrder(order) {
        const orders = this.getOrders();
        order.id = 'ORD-' + Date.now();
        order.timestamp = new Date().toISOString();
        orders.push(order);
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));

        // Update stock
        const products = this.getProducts();
        order.items.forEach(item => {
            const p = products.find(prod => prod.id === item.id);
            if (p) p.stock -= item.qty;
        });
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));

        return order;
    }

    deleteOrder(id) {
        let orders = this.getOrders();
        orders = orders.filter(o => o.id !== id);
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    }

    getCategoryIcon(category) {
        const cats = this.getCategories();
        const cat = cats.find(c => c.name === category);
        return cat ? cat.icon : '📦';
    }
}

const store = new DataStore();
window.store = store; // Make it globally accessible

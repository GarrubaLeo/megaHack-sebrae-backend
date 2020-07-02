
exports.seed = async function(knex) {
  await knex('precautions').insert([
    { title: 'Uso de máscaras pelos funcionários', image: 'mascara-medica.png' },
    { title: 'Higienização das mãos', image: 'sabonete-liquido.png' },
    { title: 'Distanciamento das mesas', image: 'distanciamento-social.png'},
    { title: 'Limpeza constante do local', image: 'limpar-limpo.png' }
  ]);
};

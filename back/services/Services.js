class Services {

  async getAll(req, res, Model, obj) {
    try {
      var lista = await Model.find();
      if (lista.lenght == 0) {
        res.status(200).json({ msg: `Ainda não temos nenhum ${obj} cadastrado no momento!` })
      } else {
        res.status(200).json(lista);
      }
    } catch (err) {
      res.status(500).json({ msg: `Algo deu errado ao buscar os ${obj}s :(`, erro: err });
    }
  }

  async findById(req, res, Model, obj) {
    try {
      var id = req.params.id;
      var objeto = await Model.find({ '_id': id });

      if (objeto[0] == undefined) {
        res.status(404).json({ msg: `O ${obj} indicado não existe!` })
      } else {
        res.status(200).json(objeto[0]);
      }
    } catch (err) {
      res.status(500).json({ msg: `Algo deu errado ao buscar pelo ${obj} :(`, erro: err })
    }
  }

  async findByName(req, res, Model, obj) {
    try {
      var nome = req.params.nome;
      var lista = await Model.find({ nome: { $regex: nome, $options: 'i' } });
      if (lista[0] == undefined) {
        res.status(400).json({ msg: `Não encontramos nenhum ${obj} com o nome informado!` })
      } else {
        res.status(200).json(lista);
      }
    } catch (err) {
      res.status(500).json({ msg: `Algo deu errado ao buscar pelos ${obj}s :(`, erro: err });
    }
  }

}

module.exports = new Services();

import mongoose from 'mongoose';

class Database {
  constructor() {
    this.mongoDB();
  }

  mongoDB() {
    this.mongoConnection = mongoose.connect(process.env.URL_DATABASE, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();

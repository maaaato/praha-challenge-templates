const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max));
};

export interface IDatabase {
  save(_:number[]):void
}

export class Database implements IDatabase {
  public save(_: number[]): void{
    console.log("hoge");
  }
}
export class DatabaseMock extends Database{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public save(_: number[]): void {
    // memo: 課題のために、あえて時々saveが失敗するようにしている
    if (getRandomInt(10) < 2) {
      throw new Error("fail!");
    }
  }
}

export class DammyDatabase extends Database{
  public save(_:number[]): void {
    console.log("save");
  }
}


// Quiz用に追加
import fs from "fs";
const filename:string = "website_result_hash.txt";
export class FileManager{
    // ファイルの保存
    static save(hashData:string){
        fs.writeFile(filename, hashData, (err)=>{
            if (err) throw err;
            console.log("saved");
        });
    }
}


const jsyaml = require('js-yaml');
export class Config {
  Cluster!: string;
  Service!: string;
  TaskCount!: number;

  load(path: string): void {
    try {
      const yml = jsyaml.load(fs.readFileSync(path));
      this.Cluster = yml["Cluster"];
      this.Service = yml["Service"];
      this.TaskCount = yml["TaskCount"];
    }catch (error){
      console.log(error);
    }finally{
      console.log("finally");
    }
  }
}

const c = new Config;
c.load('./config.yaml');
console.log(c.Cluster);
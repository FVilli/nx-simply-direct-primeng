import { Project, SyntaxKind, Decorator, Type, StructureKind, PropertySignatureStructure } from 'ts-morph';
import * as ts from 'typescript';
import path from 'path';
import fs from 'fs';

function generateTypeAliasFromType(type: Type, typeName = 'GeneratedType'): string {
  if (type.isObject() && !type.isArray()) {
    const properties = type.getProperties();

    const fields = properties.map((prop) => {
      const propType = prop.getTypeAtLocation(prop.getValueDeclarationOrThrow());
      return {
        name: prop.getName(),
        type: propType.getText(),
        hasQuestionToken: prop.hasFlags(ts.SymbolFlags.Optional),
        kind: StructureKind.PropertySignature,
      } as PropertySignatureStructure;
    });

    const fieldsString = fields
      .map((f) => `  ${f.name}${f.hasQuestionToken ? '?' : ''}: ${f.type};`)
      .join('\n');

    return `type ${typeName} = {\n${fieldsString}\n};`;
  }

  // Altri casi: array, union, ecc.
  return `type ${typeName} = ${type.getText()};`;
}

const DECORATOR_NAME = 'MyDecorator'; // Cambia con il nome che ti serve

const project = new Project({ tsConfigFilePath: 'tsconfig.json' });

// Filtra solo i file .ts (non .spec.ts, ecc.)
const sourceFiles = project.getSourceFiles('src/**/*.ts');

const services: { name: string; filePath: string }[] = [];

for (const file of sourceFiles) {
  //console.log(file.getBaseName());
  const classes = file.getClasses();

  for (const cls of classes) {
    console.log('');
    console.log(`# CLASS:${cls.getName()} #######################################################`)
    const className = cls.getName();
    const isService = !!cls.getDecorators().find((d: Decorator) => d.getName() === 'Injectable' || d.getFullName()?.includes('@nestjs/common'));
    if (!isService) continue;

    const methods = cls.getMethods(); //.filter((method) => method.getDecorators().some((d: Decorator) => d.getName() === DECORATOR_NAME));

    for (const method of methods) {
      console.log('');
      console.log(`- METHOD:${method.getName()} ---------------------------------------------------------------`)
      const methodName = method.getName();
      const parameters = method.getParameters()
      const decorators = method.getDecorators();
      const isDirectMethod = !!decorators.find((d: Decorator) => d.getName() === 'DirectMethod');
      console.log("isDirectMethod",isDirectMethod);
      
      
      const p0 = parameters[0];
      if(!!p0) {
        console.log("p0",p0.getName());
        console.log("type.text",p0.getType().getText());
        console.log("isClassOrInterface",p0.getType().isClassOrInterface());
        console.log("symbol",p0.getType().getSymbol()?.getName());
      }

      const p1 = parameters[1];
      let p1NotIAuth = false;
      if(!!p1) p1NotIAuth = p1.getType().getSymbol()?.getName()!=='IAuth';

      const rvType = method.getReturnType();
      const rvText = rvType.getText();
      const rvSymbol = rvType.getSymbol()?.getName();
      const rvAwaitedType = rvType.getTypeArguments()[0]?.getText();
      const rvAwaitedTypeSymbol = rvType.getTypeArguments()[0]?.getSymbol()?.getName();
      const rvApparentType = rvType.getApparentType().getText();

      console.log("rvText",rvText);
      console.log("rvSymbol",rvSymbol);
      console.log("rvAwaitedType",rvAwaitedType);
      console.log("rvAwaitedTypeSymbol",rvAwaitedTypeSymbol);
      console.log("rvApparentType",rvApparentType);
      
      if(parameters.length>2) {
        console.log("Solo metodi con al massimo 2 parametri di cui il secondo deve essere per forza di type:IAuth");
      } else if(p1NotIAuth) {
        console.log("Il secondo parametro, se presente, può essere solo type:IAuth");
      } else if(!p0) { 
        // NESSUN PARAMETRO
        console.log(`🔹 ${methodName}: async ():Promise<${rvText} | null> => { return await this.core.request('${className}.${methodName}',null); },`);
      } else {
        console.log(`🔹 ${methodName}: async (${p0.getName()}:${p0.getType().getText()}):Promise<${rvText} | null> => { return await this.core.request('${className}.${methodName}',${p0.getName()}); },`); 
      }


        //console.log(`🔹 ${methodName}(` + parameters.map((p) => `${p.getName()}: ${p.getType().getText()}`).join(', ') + `): ${method.getReturnType().getText()}`);
       
        //console.log(`🔹 ${methodName}: async (` + parameters.map((p) => `${p.getName()}: ${p.getType().getText()}`).join(', ') + `): ${method.getReturnType().getText()}`);
        
    }

    //if (injectable) services.push({ name: cls.getName() || '(anonymous)', filePath: file.getFilePath()});
  }
}

// console.log('✅ Servizi trovati:\n');
// for(const service of services) {
//     console.log(`- service:${service.name} path:${service.filePath}`);
// }


// if (services.length === 0) {
//   console.log('\n❌ Nessun servizio trovato.');
// }

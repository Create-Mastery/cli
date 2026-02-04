import fs from 'node:fs'
import path from 'node:path'
import chalk from 'chalk'
import tsj from 'ts-json-schema-generator'

export function genSchema(projectRoot: string) {
  const dictionarieDir = path.resolve(
    projectRoot ?? '',
    'src/i18n/dictionaries'
  )

  const tsconfigPath = path.resolve(`${projectRoot}/tsconfig.json`)
  const template = path.resolve(`${dictionarieDir}/template.ts`)
  const schemaPath = path.resolve(
    projectRoot ?? '',
    `${dictionarieDir}/schema.schema.json`
  )

  const config = {
    path: template,
    tsconfig: tsconfigPath,
    type: 'Dictionary',
    additionalProperties: true,
  }

  const schema = tsj.createGenerator(config).createSchema(config.type)
  const schemaString = JSON.stringify(schema, null, 2)

  fs.writeFileSync(schemaPath, schemaString, 'utf8')

  console.log(chalk.blue('Schema generated successfully'))
}

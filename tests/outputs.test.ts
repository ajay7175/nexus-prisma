import * as Nexus from 'nexus'
import { generateSchemaAndTypesWithoutThrowing } from './__utils'

it('only publishes output types that do not map to prisma models', async () => {
  const datamodel = `
  model User {
    id  Int @id
    name String
  }
`
  const Query = Nexus.objectType({
    name: 'Query',
    definition(t: any) {
      t.crud.user()
    },
  })

  const Mutation = Nexus.objectType({
    name: 'Mutation',
    definition(t: any) {
      t.crud.updateManyUser({ filtering: true })
    },
  })

  const { missingTypes } = await generateSchemaAndTypesWithoutThrowing(
    datamodel,
    [Query, Mutation],
  )

  expect(Object.keys(missingTypes)).toEqual(['User'])
})

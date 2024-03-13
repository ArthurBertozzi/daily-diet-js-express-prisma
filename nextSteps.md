### Next steps

- Tratativa de erros de body
- Tratativa de user not Found
- Testes unitários
- Testes DB (db teste - ref: rocketseat)
- Implementar factories
- Validação de put e delete com id`s que nao existem
- Validação de PUT de meals quando envio campo nao esperado

```
PrismaClientValidationError:
Invalid `prisma.meal.update()` invocation:

{
  where: {
    id: 3
  },
  data: {
    title: "prato principal",
    ~~~~~
?   name?: String | StringFieldUpdateOperationsInput,
?   description?: String | StringFieldUpdateOperationsInput,
?   created_at?: DateTime | DateTimeFieldUpdateOperationsInput,
?   updated_at?: DateTime | DateTimeFieldUpdateOperationsInput,
?   is_in_diet?: Boolean | BoolFieldUpdateOperationsInput,
?   user?: UserUpdateOneRequiredWithoutMealsNestedInput
  }
}

Unknown argument `title`. Available options are marked with ?.
```

# OrderQuery

Simplify the definition of order in query:

```
?$order[][publishedAt]=desc&$order[][price]=asc
```

## Usage

> In Express, you have to use the extended parser, which allows for rich query objects:
>
> ```typescript
> app.set("query parser", "extended");
> ```

Let's create an `BookOrderQueryDto` used to order books:

```typescript
class BookOrderField {
  publishedAt!: Date;
  price!: number;
}

class BookOrderQueryDto extends OrderQuery(BookOrder) {}
```

<details>
  <summary>Code that don't use `OrderQuery`</summary>

```typescript
import { IsIn, ValidatedNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

class $Order {
  @ApiProperty({
    name: "$order[][publishedAt]",
    type: "string",
    enum: ["desc", "asc"],
  })
  @IsIn(["desc", "asc"])
  publishedAt!: "desc" | "asc";
}

class BookOrderQueryDto {
  @ValidatedNested({ each: true })
  @Type(() => $Order)
  $order: $Order[];
}
```

</details>

`OrderQuery` is friendly to `@nestjs/swagger`, `class-validator` and `class-transformer`.
And it could be used in [`mikroORM`](https://mikro-orm.io/) without additional processing.

```typescript
// app.controller.ts
@Controller()
class AppController {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager
  ) {}

  @Get()
  async listBooks(@Query() order: BookOrderQueryDto): Promise<Book[]> {
    // To simplify the example, business logic is write in the controller
    const books = await this.em.find(Book, {}, { orderBy: order.$order });
    return books;
  }
}
```

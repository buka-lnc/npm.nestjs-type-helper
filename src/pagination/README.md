# Pagination

Export `Page`, `PageQuery` and `Pagination` Class simplify the code for paging queries. And it is friendly to `@nestjs/swagger`, `class-validator` and `class-transformer`.

## Usage

```typescript
// ./dto/response-of-list-books.dto
import { Page } from "@buka/nestjs-type-helper";
import { Book } from "../entity/book.entity";

export class ResponseOfListBooksDto extends Page<Book> {}
```

```typescript
// app.controller.ts
import { Page, PageQuery } from "@buka/nestjs-type-helper";
import { ResponseOfListBooksDto } from "./dto/response-of-list-books.dto";

@Controller()
export class AppController {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager
  );

  @Get()
  async listBooks(@Query() pageQuery: PageQuery): ResponseOfListBooksDto {
    const [items, total] = await this.em.findAndCount(
      {},
      {
        limit: pageQuery.limit,
        offset: pageQuery.offset,
      }
    );

    // or simplify
    // this.em.findAndCount({}, { ...pageQuery });

    return {
      items,
      pagination: {
        total,
        ...pageQuery,
      },
    };

    // or simplify
    // return Page.from(items, total, pageQuery)
  }
}
```

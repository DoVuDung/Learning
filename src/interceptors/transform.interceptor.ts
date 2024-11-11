/* eslint-disable prettier/prettier */
import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        const response = {
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: "Success",
        };

        if (
          data &&
          typeof data === "object" &&
          "totalRecords" in data &&
          "data" in data
        ) {
          response["data"] = data.data;
          response["totalRecords"] = data.totalRecords;
        } else {
          response["data"] = data;
        }

        return response;
      })
    );
  }
}

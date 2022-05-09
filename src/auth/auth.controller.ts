import { Body, Controller, Post } from "@nestjs/common";

@Controller('auth')
export class AuthController {
  @Post('/generate-token')
  public generateToken(@Body() data: any) {
    console.log(data);
    return null;
  }
}

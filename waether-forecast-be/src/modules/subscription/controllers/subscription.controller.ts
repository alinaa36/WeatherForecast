import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateSubscriptionDTO } from '../dtos/create-subscription.dto';
import { SubscriptionService } from '../services/subscription.service';
import { SubscriptionAction } from '../enum/subscription.unem';

@Controller()
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('subscribe')
  async createSubscription(@Body() subscription: CreateSubscriptionDTO) {
    await this.subscriptionService.create(subscription);
  }

  @Get('confirm/:token')
  async confirmSubscription(@Param('token') token: string) {
    await this.subscriptionService.manageSubscription(
      token,
      SubscriptionAction.CONFIRM,
    );
    return { message: 'Subscription confirmed successfully!' };
  }

  @Get('unsubscribe/:token')
  async unsubscribe(@Param('token') token: string) {
    await this.subscriptionService.manageSubscription(
      token,
      SubscriptionAction.UNSUBSCRIBE,
    );
    return { message: 'Subscription confirmed successfully!' };
  }
}

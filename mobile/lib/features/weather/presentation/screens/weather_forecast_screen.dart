import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../shared/widgets/custom_card.dart';

class WeatherForecastScreen extends ConsumerWidget {
  const WeatherForecastScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(title: const Text('Weather Forecast')),
      body: const Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: [
            CustomCard(
              child: Column(
                children: [
                  Icon(Icons.wb_sunny, size: 60, color: Colors.orange),
                  SizedBox(height: 16),
                  Text(
                    'Weather Forecast',
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 8),
                  Text('Get detailed weather forecasts for farming'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

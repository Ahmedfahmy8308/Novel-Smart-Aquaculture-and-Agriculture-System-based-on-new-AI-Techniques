import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../shared/widgets/custom_card.dart';

class YieldPredictionScreen extends ConsumerWidget {
  const YieldPredictionScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(title: const Text('Yield Prediction')),
      body: const Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: [
            CustomCard(
              child: Column(
                children: [
                  Icon(Icons.calculate, size: 60, color: Colors.blue),
                  SizedBox(height: 16),
                  Text(
                    'Yield Prediction',
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 8),
                  Text('Predict crop yields using AI and weather data'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

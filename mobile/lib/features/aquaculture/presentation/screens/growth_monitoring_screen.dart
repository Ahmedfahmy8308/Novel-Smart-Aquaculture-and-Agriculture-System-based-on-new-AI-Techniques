import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../shared/widgets/custom_card.dart';

class GrowthMonitoringScreen extends ConsumerWidget {
  const GrowthMonitoringScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(title: const Text('Growth Monitoring')),
      body: const Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: [
            CustomCard(
              child: Column(
                children: [
                  Icon(Icons.trending_up, size: 60, color: Colors.blue),
                  SizedBox(height: 16),
                  Text(
                    'Growth Monitoring',
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 8),
                  Text('Track fish growth and development over time'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

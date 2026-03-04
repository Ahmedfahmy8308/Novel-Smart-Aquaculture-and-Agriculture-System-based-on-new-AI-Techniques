import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../shared/widgets/custom_card.dart';

class ClimateAnalysisScreen extends ConsumerWidget {
  const ClimateAnalysisScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(title: const Text('Climate Analysis')),
      body: const Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: [
            CustomCard(
              child: Column(
                children: [
                  Icon(Icons.thermostat, size: 60, color: Colors.blue),
                  SizedBox(height: 16),
                  Text(
                    'Climate Analysis',
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 8),
                  Text('Analyze long-term climate patterns and trends'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

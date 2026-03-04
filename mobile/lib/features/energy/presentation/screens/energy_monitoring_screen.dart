import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../shared/widgets/custom_card.dart';

class EnergyMonitoringScreen extends ConsumerWidget {
  const EnergyMonitoringScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(title: const Text('Energy Monitoring')),
      body: const Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: [
            CustomCard(
              child: Column(
                children: [
                  Icon(
                    Icons.electrical_services,
                    size: 60,
                    color: Colors.yellow,
                  ),
                  SizedBox(height: 16),
                  Text(
                    'Energy Monitoring',
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 8),
                  Text('Monitor energy usage and efficiency in farming'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

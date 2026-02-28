import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../shared/widgets/custom_card.dart';

class SettingsScreen extends ConsumerWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(title: const Text('Settings')),
      body: const Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: [
            CustomCard(
              child: Column(
                children: [
                  Icon(Icons.settings, size: 60, color: Colors.grey),
                  SizedBox(height: 16),
                  Text(
                    'App Settings',
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 8),
                  Text('Configure app preferences and settings'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

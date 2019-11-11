#include <stdio.h>

#include <bits/stdc++.h>

#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <iterator> 
#include <map> 

using namespace std;

vector<string> read_lines(const char* file_name) {
   std::ifstream infile(file_name);
   vector<string> result;

   for (std::string line; getline( infile, line ); ) {
      result.push_back(line);
   }

   return result;
}

vector<string> tokenize(string line) {
   vector <string> tokens; 
     
   // stringstream class check1 
   stringstream check1(line); 
     
   string intermediate; 
     
   // Tokenizing w.r.t. space ' ' 
   while(getline(check1, intermediate, ' ')) 
   { 
       tokens.push_back(intermediate); 
   }

   return tokens;
}

map<string, vector<string> > get_map(vector<string> lines) {
   map<string, vector<string> > result; 

   for (vector<string>::iterator line = lines.begin(); line != lines.end(); ++line) {
      vector<string> tokens(tokenize(*line)); 
      string key = tokens.at(1);
      string value = tokens.at(2);   

      if (!result.count(key)) {
         vector<string> values;
         result.insert(pair<string, vector<string> >(key, values));
      }

      vector<string> &values = result.at(key);
      values.push_back(value);
   }

   return result;
}

static char* cluster_color = "lightgrey";
static char* node_color = "white";

void write_subgraphs(char* output_file, map<string, vector<string> > cluster, map<string, vector<string> > deps) {
   ofstream myfile;
   myfile.open (output_file);
   myfile << "digraph G {" << endl;

   int cluster_count = 1;

   // Write clusters.
   for (map<string, vector<string> >::iterator iter = cluster.begin(); iter != cluster.end(); ++iter) {
      string key = iter->first;
      myfile << "subgraph cluster_" << cluster_count++ << "{ \nstyle=filled;\ncolor=" 
             << cluster_color << ";\nnode [style=filled,color=" << node_color << "];" << endl; 
      int size = iter->second.size();
      int i = 0;
      for (vector<string>::iterator value = iter->second.begin(); value != iter->second.end(); ++value) {
         myfile << "\"" << *value << "\"";
         if (++i < size) {
            myfile << ",  ";
         } else {
            myfile << ";" << endl;
         }
      }
      myfile << endl << "label = \"" << key << "\";" << endl << "}" << endl;
   }

   // Write deps.
   for (map<string, vector<string> >::iterator iter = deps.begin(); iter != deps.end(); ++iter) {
      string key = iter->first;
      for (vector<string>::iterator value = iter->second.begin(); value != iter->second.end(); ++value) {
         myfile << "\"" << *value << "\" -> \"" << key << "\" ;" << endl; 
      }
   }

   myfile << "}" << endl;
   myfile.close();
}

void write_graph(char* output_file, map<string, vector<string> > graph) {
   ofstream myfile;
   myfile.open (output_file);
   myfile << "digraph G {" << endl;

   for (map<string, vector<string> >::iterator iter = graph.begin(); iter != graph.end(); ++iter) {
      string key = iter->first;
      for (vector<string>::iterator value = iter->second.begin(); value != iter->second.end(); ++value) {
         myfile << "\"" << *value << "\" -> \"" << key << "\" ;" << endl; 
      }
   }

   myfile << "}" << endl;
   myfile.close();
}

int main(int argc, char **argv) {
   vector<string> res(read_lines(argv[1]));
   map<string, vector<string> > deps(get_map(res));

   vector<string> resq(read_lines(argv[2]));
   map<string, vector<string> > clust(get_map(resq));

   if (argc > 4) {
      cluster_color = argv[4];
   }

   if (argc > 5) {
      node_color = argv[5];
   }

   cout << "node color: " << node_color << endl;

   cout << "cluster color: " << cluster_color << endl;

   write_subgraphs(argv[3], clust, deps);

   return 0;
}